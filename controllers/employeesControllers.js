import * as employeesService from "../services/employeesServices.js";

export const getAllEmployees = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await employeesService.getById({ _id: id });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await employeesService.removeEmployee({ _id: id });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const result = await employeesService.addEmployee({ ...req.body });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await employeesService.updateEmployeeById(
      { _id: id },
      req.body
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await employeesService.updateEmployeeById(
      { _id: id },
      req.body
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeGroups = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
