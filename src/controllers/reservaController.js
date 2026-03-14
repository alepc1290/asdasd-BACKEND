import {
  checkConflicto,
  createReserva,
  getAllReservas,
  getReservaById,
  deleteReserva,
  updateGoogleEventId,
} from "../services/reservaService.js";
import { getCanchaById } from "../services/canchaService.js";
import { getUserById } from "../services/userService.js";
import {
  createCalendarEvent,
  deleteCalendarEvent,
} from "../services/googleCalendarService.js";

// POST /api/reservas
export async function addReserva(req, res) {
  try {
    const { canchaId, fecha, horaInicio, horaFin } = req.body;
    const userId = req.user.id;

    // Validar campos requeridos
    if (!canchaId || !fecha || !horaInicio || !horaFin) {
      return res.status(400).json({
        success: false,
        message: "canchaId, fecha, horaInicio y horaFin son requeridos",
      });
    }

    // Validar que horaFin > horaInicio
    if (horaFin <= horaInicio) {
      return res.status(400).json({
        success: false,
        message: "La hora de fin debe ser posterior a la hora de inicio",
      });
    }

    // Verificar que la cancha existe
    const cancha = await getCanchaById(canchaId);
    if (!cancha) {
      return res.status(404).json({ success: false, message: "Cancha no encontrada" });
    }

    if (cancha.estado !== "disponible") {
      return res.status(400).json({
        success: false,
        message: `La cancha no está disponible (estado: ${cancha.estado})`,
      });
    }

    // ✅ Verificar conflicto de horario
    const conflicto = await checkConflicto(canchaId, fecha, horaInicio, horaFin);
    if (conflicto) {
      return res.status(400).json({
        success: false,
        message: "La cancha ya tiene una reserva en ese horario. Elegí otro turno.",
      });
    }

    // Crear la reserva
    const reserva = await createReserva({ userId, canchaId, fecha, horaInicio, horaFin });

    // Intentar crear evento en Google Calendar (opcional, no rompe el flujo si falla)
    try {
      const user = await getUserById(userId);
      if (user?.googleAccessToken && user?.googleRefreshToken) {
        const eventId = await createCalendarEvent(
          user.googleAccessToken,
          user.googleRefreshToken,
          reserva,
          cancha.nombre
        );
        await updateGoogleEventId(reserva._id, eventId);
        reserva.googleEventId = eventId;
      }
    } catch (calendarError) {
      console.warn("Google Calendar: no se pudo crear el evento →", calendarError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Reserva creada correctamente",
      data: reserva,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/reservas
export async function getReservas(req, res) {
  try {
    const reservas = await getAllReservas();
    return res.status(200).json({ success: true, data: reservas });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/reservas/:id
export async function getReserva(req, res) {
  try {
    const reserva = await getReservaById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ success: false, message: "Reserva no encontrada" });
    }
    return res.status(200).json({ success: true, data: reserva });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// DELETE /api/reservas/:id
export async function removeReserva(req, res) {
  try {
    const reserva = await getReservaById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ success: false, message: "Reserva no encontrada" });
    }

    // Intentar eliminar el evento de Google Calendar si existe
    if (reserva.googleEventId) {
      try {
        const user = await getUserById(reserva.userId._id || reserva.userId);
        if (user?.googleAccessToken) {
          await deleteCalendarEvent(
            user.googleAccessToken,
            user.googleRefreshToken,
            reserva.googleEventId
          );
        }
      } catch (calendarError) {
        console.warn("Google Calendar: no se pudo eliminar el evento →", calendarError.message);
      }
    }

    await deleteReserva(req.params.id);
    return res.status(200).json({ success: true, message: "Reserva eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
