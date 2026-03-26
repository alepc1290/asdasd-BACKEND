import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONT_URL = process.env.FRONT_URL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// Datos bancarios para transferencia 
const ALIAS_TRANSFERENCIA = process.env.ALIAS_TRANSFERENCIA || "canchas.deportes";
const CBU_TRANSFERENCIA = process.env.CBU_TRANSFERENCIA || "0000000000000000000000";
const TITULAR_CUENTA = process.env.TITULAR_CUENTA || "Complejo Deportivo";
const BANCO_NOMBRE = process.env.BANCO_NOMBRE || "Banco Nación";
const WHATSAPP_ADMIN = process.env.WHATSAPP_ADMIN || "+5493813657948";

// Nodemailer — configuración SMTP (Simple Mail Transfer Protocol)
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || "Canchas & Deportes <no-reply@canchas.com>";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
export {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  FRONT_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  ALIAS_TRANSFERENCIA,
  CBU_TRANSFERENCIA,
  TITULAR_CUENTA,
  BANCO_NOMBRE,
  WHATSAPP_ADMIN,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  BACKEND_URL
}

export const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
export const CLOUDINARY_CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME;
export const CLOUDINARY_APIKEY = process.env.CLOUDINARY_APIKEY;
