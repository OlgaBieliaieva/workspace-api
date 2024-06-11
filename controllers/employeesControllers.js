import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as employeesService from "../services/employeesServices.js";

const getAllEmployees = async (req, res) => {
  const { page = 1, limit = 20, ...params } = req.query;
  const filter = { ...params };
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await employeesService.getAll({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const result = await employeesService.getOne({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await employeesService.removeEmployee({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createEmployee = async (req, res) => {
  const result = await employeesService.addEmployee({ ...req.body });
  res.status(201).json(result);
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;

  const result = await employeesService.updateEmployeeById(
    { _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateEmployeeStatus = async (req, res) => {
  const { id } = req.params;
  const result = await employeesService.updateEmployeeById(
    { _id: id },
    req.body
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateEmployeeGroups = async (req, res) => {
  const { id } = req.params;
  const employee = await employeesService.getById({ _id: id });

  const result = await employeesService.updateEmployeeById(
    { _id: id },
    { groups: [...employee.groups, req.body.group] }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  getAllEmployees: ctrlWrapper(getAllEmployees),
  getEmployeeById: ctrlWrapper(getEmployeeById),
  deleteById: ctrlWrapper(deleteById),
  createEmployee: ctrlWrapper(createEmployee),
  updateEmployee: ctrlWrapper(updateEmployee),
  updateEmployeeStatus: ctrlWrapper(updateEmployeeStatus),
  updateEmployeeGroups: ctrlWrapper(updateEmployeeGroups),
};
