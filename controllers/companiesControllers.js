import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as companiesService from "../services/companiesServices.js";

const getAllCompanies = async (req, res) => {
  const { page = 1, limit = 20, ...params } = req.query;
  const filter = { ...params };
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await companiesService.getAll({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  const result = await companiesService.getById({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await companiesService.removeCompany({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateCompany = async (req, res) => {
  const { id } = req.params;

  const result = await companiesService.updateCompanyById(
    { _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createCompany = async (req, res) => {
  const result = await companiesService.addCompany({ ...req.body });
  res.status(201).json(result);
};

export default {
  getAllCompanies: ctrlWrapper(getAllCompanies),
  getCompanyById: ctrlWrapper(getCompanyById),
  deleteById: ctrlWrapper(deleteById),
  updateCompany: ctrlWrapper(updateCompany),
  createCompany: ctrlWrapper(createCompany),
};
