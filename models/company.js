import { Schema } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

import { companyOrgList } from "../constants/companyConstants.js";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "Set company name"],
    },
    companyOrg: {
      type: String,
      enum: companyOrgList,
      required: [true, "Set company organization"],
    },
    companyCode: {
      type: String,
      required: [true, "Set company tax payment code"],
    },
    companyIBAN: {
      type: String,
      default: "",
    },
    companyLogoUrl: {
      type: String,
      default: "",
    },
    companyField: {
      type: String,
      required: [true, "Set company's field"],
    },
    companyCountry: {
      type: String,
      required: [true, "Set company's country"],
    },
    companyCity: {
      type: String,
      required: [true, "Set company's city"],
    },
    companyAddress: {
      type: String,
      required: [true, "Set company's address"],
    },
    email: {
      type: String,
      required: [true, "Set company's email"],
    },
    phone: {
      type: String,
      required: [true, "Set company's phone"],
    },
    socials: {
      linkedIn: String,
      facebook: String,
    },
    website: {
      type: String,
      default: "",
    },
    companyType: {
      type: String,
      enum: ["client", "supplier", "other"],
      required: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    sharedWorkspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

companySchema.post("save", handleSaveError);

companySchema.pre("findOneAndUpdate", setUpdateSettings);

companySchema.post("findOneAndUpdate", handleSaveError);

const Company = contactsDB.model("company", companySchema);

export default Company;
