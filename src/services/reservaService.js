import Reserva from "../models/Reserva.js";

/**
 * Verifica si ya existe una reserva que se superponga con el horario solicitado.
 * Lógica: hay conflicto si la nueva reserva empieza antes de que termine la existente
 * Y termina después de que empiece la existente.
 */
export async function checkConflicto(canchaId, fecha, horaInicio, horaFin) {
  const reservas = await Reserva.find({ canchaId, fecha, deleted: false });

  for (const r of reservas) {
    const existeInicio = r.horaInicio;
    const existeFin = r.horaFin;

    // Hay superposición si: nuevaInicio < existeFin Y nuevaFin > existeInicio
    if (horaInicio < existeFin && horaFin > existeInicio) {
      return true; // hay conflicto
    }
  }
  return false;
}

export async function createReserva(data) {
  return await Reserva.create(data);
}

export async function getAllReservas() {
  return await Reserva.find({ deleted: false })
    .populate("userId", "nombre email")
    .populate("canchaId", "nombre tipo precio");
}

export async function getReservaById(id) {
  return await Reserva.findOne({ _id: id, deleted: false })
    .populate("userId", "nombre email")
    .populate("canchaId", "nombre tipo precio");
}

export async function deleteReserva(id) {
  return await Reserva.findByIdAndUpdate(id, { deleted: true }, { new: true });
}

export async function updateGoogleEventId(id, googleEventId) {
  return await Reserva.findByIdAndUpdate(id, { googleEventId }, { new: true });
}
