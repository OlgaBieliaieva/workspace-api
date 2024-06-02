import Company from "../models/company.js";

export function getAll(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Company.find(filter, fields, settings);
}

export async function getById(filter) {
  const result = await Company.findOne(filter);
  return result;
}

export function removeCompany(filter) {
  return Company.findOneAndDelete(filter);
}

export function addCompany(data) {
  return Company.create(data);
}

export const updateCompanyById = (filter, data) => {
  return Company.findOneAndUpdate(filter, data);
};
