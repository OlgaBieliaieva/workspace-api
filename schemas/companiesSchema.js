import Joi from "joi";
import { companyOrgList } from "../constants/companyConstants.js";

export const createCompanySchema = Joi.object({
  companyName: Joi.string().required(),
  companyOrg: Joi.string()
    .valid(...companyOrgList)
    .required(),
  companyCode: Joi.string().required(),
  companyField: Joi.string().required(),
  companyCountry: Joi.string().required(),
  companyCity: Joi.string().required(),
  companyAddress: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  socials: {
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  },
});

export const updateCompanySchema = Joi.object({
  companyName: Joi.string(),
  companyOrg: Joi.string().valid(...companyOrgList),
  companyCode: Joi.string(),
  companyField: Joi.string(),
  companyCountry: Joi.string(),
  companyCity: Joi.string(),
  companyAddress: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  socials: {
    linkedIn: Joi.string(),
    facebook: Joi.string(),
  },
});
