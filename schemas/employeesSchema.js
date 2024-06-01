import Joi from "joi";
import { employeeStatusList } from "../constants/employeeConstants.js";

export const createEmployeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string(),
  birthDate: Joi.string().required(),
  department: Joi.string().required(),
  position: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  socials: Joi.object({
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  }),
  groups: Joi.array(),
  isActive: Joi.boolean(),
});

export const updateEmployeeSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  birthDate: Joi.string(),
  department: Joi.string(),
  position: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  socials: Joi.object({
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  }),
  groups: Joi.array(),
  isActive: Joi.boolean(),
});

export const updateEmployeeStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...employeeStatusList)
    .default("not specified"),
});

export const updateEmployeeGroupsSchema = Joi.object({
  group: Joi.string().required(),
  // .valid(...employeeStatusList)
  // .default("not specified"),
});
