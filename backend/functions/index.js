import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { pubsub } from "firebase-functions";
import serviceAccount from "./plazapp-credentials.json" assert { type: "json" };
import { accountCreated, notification } from "./utils/template.js";
import { transporter } from "./utils/nodemailer.js";
import { generatePassword } from "./utils/generatePassword.js";

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

    const mailOptions = {
      from: `"Admin" ${process.env.EMAIL}`,
      to: email,
      subject: "Cuenta creada - Plazapp",
      html: accountCreated(userToRegister),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo enviado: " + info.response);
      }
    });

    return res
      .status(200)
      .json({ uid: userRecord.uid, message: "Usuario registrado con éxito!" });
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
    const { email, displayName } = req.body;

    const userRecord = await admin
      .auth()
      .updateUser(userId, { email, displayName });

    if (userRecord) {
      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito!" });
    }
    return res.status(400).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export const executeSendingNotifications = pubsub
  .schedule("0 12 * * *") // minuto(0-59) | hora(0-23) | día_del_mes(0-31) | mes(1-12) | día_de_la_semana(0-6 / Dom = 0)
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
      console.log(data.email);
      const email = data.email;
      const subject = "Notificación Diaria - Plazapp";

      const mailOptions = {
        from: `"Admin" ${process.env.EMAIL}`,
        to: email,
        subject: subject,
        html: notification,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo enviado: " + info.response);
        }
      });
    });

    return null;
  });
