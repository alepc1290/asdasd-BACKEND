import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  googleAuthRedirect,
  googleAuthCallback,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Verificación de email — el link del correo apunta aquí
router.get("/verify-email", verifyEmail);

// Google Calendar OAuth2
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

export default router;
