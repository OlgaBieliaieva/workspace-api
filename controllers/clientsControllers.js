import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as clientsService from "../services/clientsServices.js";

const getAll = async (req, res) => {
  const { page = 1, limit = 20, ...params } = req.query;
  const filter = { ...params };
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await clientsService.getAll({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  const result = await clientsService.getById({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await clientsService.removeClient({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateClient = async (req, res) => {
  const { id } = req.params;

  const result = await clientsService.updateClientById({ _id: id }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createClient = async (req, res) => {
  const result = await clientsService.addClient({ ...req.body });
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getClientById: ctrlWrapper(getClientById),
  deleteById: ctrlWrapper(deleteById),
  updateClient: ctrlWrapper(updateClient),
  createClient: ctrlWrapper(createClient),
};
