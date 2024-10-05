import dotenv from "dotenv";
dotenv.config();

export const env = {
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
};
