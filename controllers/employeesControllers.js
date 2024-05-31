import * as employeesService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const createEmployee = async (req, res, next) => {
  try {
    const result = await employeesService.addEmployee({ ...req.body });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
