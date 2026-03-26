import Cancha from "../models/Cancha.js";

async function getAllCanchas() {
  return await Cancha.find({ deleted: false });
}

async function getCanchaById(id) {
  return await Cancha.findOne({ _id: id, deleted: false });
}

async function createCancha(data) {
  return await Cancha.create(data);
}

async function updateCancha(id, data) {
  return await Cancha.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCancha(id) {
  return await Cancha.findByIdAndUpdate(id, { deleted: true }, { new: true });
}

export {
  getAllCanchas,
  getCanchaById,
  createCancha,
  updateCancha,
  deleteCancha
}