import * as companiesService from "../services/companiesServices.js";

export const getAllCompanies = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companiesService.getById({ _id: id });
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
    const result = await companiesService.removeCompany({ _id: id });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await companiesService.updateCompanyById(
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

export const createCompany = async (req, res, next) => {
  try {
    const result = await companiesService.addCompany({ ...req.body });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
