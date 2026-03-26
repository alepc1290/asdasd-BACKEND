import Producto from "../models/Producto.js";

async function getAllProductos() {
  return await Producto.find({ deleted: false });
}

async function getProductoById(id) {
  return await Producto.findOne({ _id: id, deleted: false });
}

async function createProducto(data) {
  return await Producto.create(data);
}

async function updateProducto(id, data) {
  return await Producto.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProducto(id) {
  return await Producto.findByIdAndUpdate(id, { deleted: true }, { new: true });
}

export {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
}
