import Employee from "../models/employee.js";

export function getAll(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Employee.find(filter, fields, settings);
}

export async function getById(filter) {
  const result = await Employee.findOne(filter);
  return result;
}

export function removeEmployee(filter) {
  return Employee.findOneAndDelete(filter);
}

export function addEmployee(data) {
  return Employee.create(data);
}

export const updateEmployeeById = (filter, data) => {
  return Employee.findOneAndUpdate(filter, data);
};
