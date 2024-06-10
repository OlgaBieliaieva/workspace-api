import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as suppliersService from "../services/suppliersServices.js";

const getAll = async (req, res) => {
  const { page = 1, limit = 20, ...params } = req.query;
  const filter = { ...params };
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await suppliersService.getAll({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;
  const result = await suppliersService.getById({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await suppliersService.removeSupplier({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;

  const result = await suppliersService.updateSupplierById(
    { _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createSupplier = async (req, res) => {
  const result = await suppliersService.addSupplier({ ...req.body });
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getSupplierById: ctrlWrapper(getSupplierById),
  deleteById: ctrlWrapper(deleteById),
  updateSupplier: ctrlWrapper(updateSupplier),
  createSupplier: ctrlWrapper(createSupplier),
};
