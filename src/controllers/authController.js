import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { createUser, getUserByEmail, updateUserTokens } from "../services/userService.js";
import {
  getAuthUrl,
  getTokensFromCode,
} from "../services/googleCalendarService.js";

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "nombre, email y password son requeridos",
      });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "El email ya está registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createUser({
      nombre,
      email,
      password: passwordHash,
      rol: rol === "admin" ? "admin" : "user",
    });

    return res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email y password son requeridos",
      });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const payload = {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: { token, user: payload },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/auth/google — redirige al usuario a la pantalla de autorización de Google
export function googleAuthRedirect(req, res) {
  const url = getAuthUrl();
  return res.redirect(url);
}

// GET /api/auth/google/callback — Google llama aquí con el código de autorización
export async function googleAuthCallback(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ success: false, message: "Código de autorización faltante" });
    }

    const tokens = await getTokensFromCode(code);

    // El userId viene en el state si se implementa; por ahora se guarda tras el login
    // Para simplificar: guardamos los tokens en el usuario autenticado vía query param userId
    const { userId } = req.query;
    if (userId) {
      await updateUserTokens(userId, tokens.access_token, tokens.refresh_token);
    }

    return res.status(200).json({
      success: true,
      message: "Google Calendar vinculado correctamente",
      data: { accessToken: tokens.access_token, refreshToken: tokens.refresh_token },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
