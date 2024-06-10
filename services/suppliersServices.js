import Supplier from "../models/supplier.js";

export function getAll(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Supplier.find(filter, fields, settings);
}

export async function getById(filter) {
  const result = await Supplier.findOne(filter);
  return result;
}

export function removeSupplier(filter) {
  return Supplier.findOneAndDelete(filter);
}

export function addSupplier(data) {
  return Supplier.create(data);
}

export const updateSupplierById = (filter, data) => {
  return Supplier.findOneAndUpdate(filter, data);
};
