import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { pubsub } from "firebase-functions";
import serviceAccount from "./plazapp-credentials.json" assert { type: "json" };
import { generatePassword } from "./utils/generatePassword.js";
import {
  sendNotificationMail,
  sendRegisterUserMail,
  sendToggleDisableMail,
  sendUpdateUserMail,
} from "./utils/mail.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const registerUser = onRequest(async (req, res) => {
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

export const updateUser = onRequest(async (req, res) => {
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

export const toggleDisableUser = onRequest(async (req, res) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { userId } = req.query;
    const { email, name, disabled } = req.body;
    const action = disabled ? "deshabilitada" : "habilitada";

    const userAdminRecord = await admin.auth().updateUser(userId, { disabled });
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

      sendNotificationMail(email);
      console.log(`Notificación enviada a ${data.email}`);
    });

    return null;
  });
