import { transporter } from "../config/nodemailer.js";
import { env } from "../config/env.js";
import {
  accountCreated,
  accountToggleDisabled,
  accountUpdated,
  notification,
} from "./template.js";

const { EMAIL } = env;

const sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

export const sendRegisterUserMail = (userToRegister) => {
  try {
    const mailOptions = {
      from: `"Admin" ${EMAIL}`,
      to: userToRegister.email,
      subject: "Cuenta creada - Plazapp",
      html: accountCreated(userToRegister),
    };

    sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export const sendUpdateUserMail = (userToUpdate) => {
  try {
    const mailOptions = {
      from: `"Admin" ${EMAIL}`,
      to: userToUpdate.email,
      subject: "Cuenta actualizada - Plazapp",
      html: accountUpdated(userToUpdate),
    };

    sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export const sendToggleDisableMail = ({ email, name, disabled }) => {
  try {
    const action = disabled ? "deshabilitada" : "habilitada";

    const mailOptions = {
      from: `"Admin" ${EMAIL}`,
      to: email,
      subject: `Cuenta ${action} - Plazapp`,
      html: accountToggleDisabled({ displayName: name, disabled }),
    };

    sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export const sendNotificationMail = (email) => {
  try {
    const mailOptions = {
      from: `"Admin" ${EMAIL}`,
      to: email,
      subject: "Notificación Diaria - Plazapp",
      html: notification,
    };

    sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
