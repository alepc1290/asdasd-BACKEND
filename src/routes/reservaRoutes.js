import { Router } from "express";
import {
  addReserva,
  getReservas,
  getReserva,
  removeReserva,
} from "../controllers/reservaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Todas las rutas de reservas requieren autenticación
router.post("/", verifyToken, addReserva);
router.get("/", verifyToken, getReservas);
router.get("/:id", verifyToken, getReserva);
router.delete("/:id", verifyToken, removeReserva);

export default router;
