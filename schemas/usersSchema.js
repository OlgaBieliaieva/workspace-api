import Joi from "joi";
import { employeeStatusList } from "../constants/employeeConstants.js";

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

export const updateUserStatusSchema = Joi.object({
  status: Joi.string().valid(...employeeStatusList).required(),
});
