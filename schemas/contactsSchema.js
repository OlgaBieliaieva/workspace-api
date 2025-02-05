import Joi from "joi";

const phoneSchema = Joi.object({
  type: Joi.string().valid("work", "home", "mobile", "other").default("mobile"),
  number: Joi.string()
    .pattern(/^[+\d][\d\s-]+$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format.",
    }),
});

const emailSchema = Joi.object({
  type: Joi.string().valid("work", "personal", "other").default("work"),
  address: Joi.string().email().required(),
});

const socialSchema = Joi.object({
  platform: Joi.string()
    .valid("LinkedIn", "Facebook", "Telegram", "Twitter", "Instagram", "Other")
    .required(),
  link: Joi.string().uri().required(),
});

export const createContactSchema = Joi.object({
  firstName: Joi.string().min(1).required().messages({
    "string.empty": "First name is required.",
  }),
  lastName: Joi.string().min(1).required().messages({
    "string.empty": "Last name is required.",
  }),
  middleName: Joi.string().allow(null, ""),
  // avatar: Joi.object({
  //   avatarId: Joi.string().allow(null),
  //   avatarUrl: Joi.string().uri().allow(null),
  // }).allow(null),
  birthDate: Joi.date().iso().allow(null),
  hireDate: Joi.date().iso().allow(null),
  contactType: Joi.string()
    .valid("employee", "client_person", "supplier_person")
    .required("Choose contact type"),
  company: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null),
  department: Joi.string().allow(null, ""),
  position: Joi.string().allow(null, ""),
  phones: Joi.array().items(phoneSchema).default([]),
  emails: Joi.array().items(emailSchema).default([]),
  socials: Joi.array().items(socialSchema).default([]),
  isActive: Joi.boolean().default(false),
  sharedWorkspaces: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ),
  // createdBy: Joi.string()
  //   .pattern(/^[0-9a-fA-F]{24}$/)
  //   .required()
  //   .messages({
  //     "string.pattern.base": "Invalid user ID format.",
  //   }),
});

export const updateContactSchema = Joi.object({
  firstName: Joi.string().min(1).messages({
    "string.empty": "First name cannot be empty.",
  }),
  lastName: Joi.string().min(1).messages({
    "string.empty": "Last name cannot be empty.",
  }),
  middleName: Joi.string().allow(null, ""),
  birthDate: Joi.date().iso().allow(null),
  hireDate: Joi.date().iso().allow(null),
  contactType: Joi.string().valid(
    "employee",
    "client_person",
    "supplier_person"
  ),
  company: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null),
  department: Joi.string().allow(null, ""),
  position: Joi.string().allow(null, ""),
  phones: Joi.array().items(phoneSchema),
  emails: Joi.array().items(emailSchema),
  socials: Joi.array().items(socialSchema),
  isActive: Joi.boolean(),
  sharedWorkspaces: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated.",
  });
