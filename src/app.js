import express from "express";
import cors from "cors";
import { FRONT_URL } from "./config/env.js";
import router from "./routes/index.js";

const app = express();

app.use(cors({
  origin: [FRONT_URL || "*"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", router);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "🚀 API Canchas funcionando correctamente" });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

export default app;
