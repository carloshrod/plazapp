import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { pubsub } from "firebase-functions";
import cors from "cors";
import serviceAccount from "./plazapp-credentials.json" assert { type: "json" };
import { generatePassword } from "./utils/generatePassword.js";
import {
  sendNotificationMail,
  sendRegisterUserMail,
  sendTerminationNotice,
  sendToggleDisableMail,
  sendUpdateUserMail,
} from "./utils/mail.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const corsHandler = cors({ origin: true });

export const registerUser = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método no permitido" });
    }

    try {
      const { email, name } = req.body;

      const userToRegister = {
        email,
        displayName: name,
        password: generatePassword(8),
      };

      const userRecord = await admin.auth().createUser(userToRegister);

      if (userRecord) {
        sendRegisterUserMail(userToRegister);

        return res.status(200).json({
          uid: userRecord.uid,
          message: "Usuario registrado con éxito!",
        });
      }

      throw new Error("Error al registrar usuario");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  });
});

export const updateUser = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method !== "PUT") {
      return res.status(405).json({ message: "Método no permitido" });
    }

    try {
      const { userId } = req.query;
      const { email, name } = req.body;

      const userToUpdate = { email, displayName: name };

      const userRecord = await admin.auth().updateUser(userId, userToUpdate);

      if (userRecord) {
        sendUpdateUserMail(userToUpdate);

        return res
          .status(200)
          .json({ message: "Usuario actualizado con éxito!" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
});

export const toggleDisableUser = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method !== "PATCH") {
      return res.status(405).json({ message: "Método no permitido" });
    }

    try {
      const { userId } = req.query;
      const { email, name, disabled } = req.body;
      const action = disabled ? "deshabilitada" : "habilitada";

      const userAdminRecord = await admin
        .auth()
        .updateUser(userId, { disabled });
      if (!userAdminRecord)
        throw new Error("No se encontró usuario administrador");

      sendToggleDisableMail({ email, name, disabled });

      const userTenantsRef = admin.firestore().collection("users");
      let snapshot = await userTenantsRef.where("adminId", "==", userId).get();
      let docs = snapshot.docs;

      if (docs?.length > 0) {
        for (const doc of docs) {
          const data = doc.data();
          const userTenantRecord = await admin
            .auth()
            .updateUser(data.id, { disabled });
          if (!userTenantRecord)
            throw new Error(`No encontró usuario locatario con id ${data.id}`);

          sendToggleDisableMail({
            email: data.email,
            name: data.name,
            disabled,
          });
        }
      }

      return res
        .status(200)
        .json({ message: `Cuenta de Admin ${action} con éxito!` });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
});

export const executeSendingNotifications = pubsub
  .schedule("00 12 * * *") // minuto(0-59) | hora(0-23) | día_del_mes(0-31) | mes(1-12) | día_de_la_semana(0-6 / Dom = 0)
  .timeZone("America/Mexico_City") // America/Mexico_City
  .onRun(async (_context) => {
    console.log("Ejecutando envío de notificaciones!");

    const now = new Date();
    const day = now.getDate(); // Día actual
    const lastDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const notificationsRef = admin.firestore().collection("users");

    // Obtener notificaciones para el día actual
    let snapshot = await notificationsRef
      .where("notifDays", "array-contains", day)
      .get();
    let docs = snapshot.docs;

    // Si hoy es el último día del mes, también obtenemos notificaciones para los posibles días faltantes 29, 30, y 31
    if (day === lastDayOfMonth) {
      const additionalDays = [29, 30, 31];
      for (const extraDay of additionalDays) {
        // Se obtienen las notificaciones adicionales siempre y cuando el día actual sea menor el día faltante (extraDay). Por ejemplo si el día actual es 30, se omite el día 29 porque ya pasó, se omite el día 30 porque es el día actual y ya se obtuvieron las notificaciones para este (línea 31) y solo se obtienen las notificaciones adicionales para el día 31 (si estas existen) que es el único posible día faltante
        if (day < extraDay) {
          const extraSnapshot = await notificationsRef
            .where("notifDays", "array-contains", extraDay)
            .get();
          docs = docs.concat(extraSnapshot.docs);
        }
      }
    }

    // Filtrar documentos duplicados
    const uniqueDocs = [];
    const uniqueDocIds = new Set();
    docs.forEach((doc) => {
      if (!uniqueDocIds.has(doc.id)) {
        uniqueDocIds.add(doc.id);
        uniqueDocs.push(doc);
      }
    });

    if (uniqueDocs.length === 0)
      return console.log("No hay notificaciones para el día de hoy!");

    uniqueDocs.forEach(async (doc) => {
      const data = doc.data();
      const email = data.email;

      console.log(`Enviando notificación a ${data.email}`);
      sendNotificationMail(email);
    });

    return null;
  });

// ********** Notificaciones de término de contrato **********
export const executeSendingTerminationNotice = pubsub
  .schedule("00 10 * * *")
  .timeZone("America/Mexico_City")
  .onRun(async (_context) => {
    console.log("Ejecutando envío de notificaciones de término de contrato!");

    const usersRef = admin.firestore().collection("users");
    const plazasRef = admin.firestore().collection("plazas");

    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    // Calcular la fecha para 3 días
    const todayPlus3 = new Date();
    todayPlus3.setDate(todayPlus3.getDate() + 3);
    const formattedTodayPlus3 = todayPlus3.toISOString().split("T")[0];

    // Calcular la fecha para 5 días
    const todayPlus5 = new Date();
    todayPlus5.setDate(todayPlus5.getDate() + 5);
    const formattedTodayPlus5 = todayPlus5.toISOString().split("T")[0];

    // Obtener usuarios cuya fecha de finalización sea hoy, en 3 días o en 5 días
    let tenantSnapshot = await usersRef
      .where("EndDate", "in", [
        formattedToday,
        formattedTodayPlus3,
        formattedTodayPlus5,
      ])
      .get();
    let tenantDocs = tenantSnapshot.docs;

    if (tenantDocs.length === 0) {
      return console.log("No hay usuarios para notificar el día de hoy!");
    }

    for (const doc of tenantDocs) {
      // Notificar a locatario
      const tenantData = doc.data();
      const tenantName = tenantData.name;
      const tenantEmail = tenantData.email;
      const storeId = tenantData.storeId;
      const endDate = tenantData.EndDate;

      const currentToday = new Date();
      const timeDiff = new Date(endDate).getTime() - currentToday.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      console.log(`Enviando notificación a locatario: ${tenantEmail}`);
      sendTerminationNotice({
        email: tenantEmail,
        tenantName,
        endDate,
        daysLeft,
        isTenant: true,
      });

      // Notificar a admins
      let plazaSnapshot = await plazasRef
        .where("stores", "array-contains", storeId)
        .get();
      let plazaDocs = plazaSnapshot.docs;

      for (const doc of plazaDocs) {
        const plazaData = doc.data();
        const adminId = plazaData.adminId;

        let adminSnapshot = await usersRef.where("id", "==", adminId).get();
        let adminData = adminSnapshot.docs[0].data();
        const adminEmail = adminData.email;

        console.log(`Enviando notificación a admin: ${adminEmail}`);
        sendTerminationNotice({
          email: adminEmail,
          tenantName,
          endDate,
          daysLeft,
        });
      }

      // Notificar a superadmins
      let superAdminSnapshot = await usersRef
        .where("role", "==", "superadmin")
        .get();
      let superAdminDocs = superAdminSnapshot.docs;

      for (const doc of superAdminDocs) {
        const superAdminData = doc.data();
        const superAdminEmail = superAdminData.email;

        console.log(`Enviando notificación a superadmin: ${superAdminEmail}`);
        sendTerminationNotice({
          email: superAdminEmail,
          tenantName,
          endDate,
          daysLeft,
        });
      }
    }

    return null;
  });
