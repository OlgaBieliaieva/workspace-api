import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string(),
  avatarUrl: Joi.string(),
  birthDate: Joi.string().required(),
  department: Joi.string().required(),
  position: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
