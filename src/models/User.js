import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // Tokens de Google OAuth2 para Calendar (se guardan tras autorizar)
    googleAccessToken: { type: String, default: null },
    googleRefreshToken: { type: String, default: null },
    // Verificación de email
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
