import { createTransport } from "nodemailer";
import { env } from "./env.js";

const { EMAIL, PASSWORD, NODE_ENV } = env;

export const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: {
    rejectUnauthorized: NODE_ENV === "production",
  },
});
