import Joi from "joi";
// import { employeeStatusList } from "../constants/employeeConstants.js";

export const signUpUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signInUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSubscriptionSchema = Joi.object({
  subscriptionType: Joi.string().valid("Free", "Premium").required(),
  
});

// export const updateEmployeeSchema = Joi.object({
//   firstName: Joi.string(),
//   lastName: Joi.string(),
//   middleName: Joi.string(),
//   birthDate: Joi.string(),
//   department: Joi.string(),
//   position: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.string(),
//   socials: Joi.object({
//     linkedIn: Joi.string(),
//     facebook: Joi.string(),
//   }),
//   groups: Joi.array(),
//   isActive: Joi.boolean(),
// });

// export const updateEmployeeStatusSchema = Joi.object({
//   status: Joi.string()
//     .valid(...employeeStatusList)
//     .default("not specified"),
// });

// export const updateEmployeeGroupsSchema = Joi.object({
//   group: Joi.string().required(),
//   // .valid(...employeeStatusList)
//   // .default("not specified"),
// });
