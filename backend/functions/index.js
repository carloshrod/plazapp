import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import serviceAccount from "./plazapp-credentials.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const registerUser = onRequest(async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    return res
      .status(200)
      .json({ uid: userRecord.uid, message: "Usuario registrado con éxito!" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
