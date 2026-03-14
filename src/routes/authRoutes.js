import { Router } from "express";
import {
  register,
  login,
  googleAuthRedirect,
  googleAuthCallback,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Google Calendar OAuth2
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

export default router;
