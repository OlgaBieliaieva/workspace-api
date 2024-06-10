import Joi from "joi";

export const createClientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  birthDate: Joi.string(),
  company: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format")
    .required(),
  department: Joi.string(),
  position: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().required(),
  socials: Joi.object({
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  }),
  isActive: Joi.boolean(),
  manager: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format")
    .required(),
  groups: Joi.array(),
  tags: Joi.array(),
  note: Joi.string(),
});

export const updateClientSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  birthDate: Joi.string(),
  company: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format"),
  department: Joi.string(),
  position: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  socials: Joi.object({
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  }),
  isActive: Joi.boolean(),
  manager: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format")
    .required(),
  groups: Joi.array(),
  tags: Joi.array(),
  note: Joi.string(),
});
