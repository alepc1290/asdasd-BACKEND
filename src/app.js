import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import passport from "./config/passport.js";

const app = express();

// ✅ CORS configurado correctamente para producción
app.use(cors({
  origin: process.env.FRONT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport (sin sesiones - usamos JWT)
app.use(passport.initialize());

// Rutas
app.use("/api", router);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "🚀 API funcionando correctamente" });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

export default app;