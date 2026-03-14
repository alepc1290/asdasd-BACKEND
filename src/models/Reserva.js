import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es requerido"],
    },
    canchaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cancha",
      required: [true, "La cancha es requerida"],
    },
    fecha: {
      type: String, // formato: "YYYY-MM-DD"
      required: [true, "La fecha es requerida"],
    },
    horaInicio: {
      type: String, // formato: "HH:MM"
      required: [true, "La hora de inicio es requerida"],
    },
    horaFin: {
      type: String, // formato: "HH:MM"
      required: [true, "La hora de fin es requerida"],
    },
    googleEventId: {
      type: String,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reserva", reservaSchema);
