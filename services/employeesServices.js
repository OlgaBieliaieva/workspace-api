import Employee from "../models/employee";

export function addEmployee(data) {
  return Employee.create(data);
}
