import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

import {
  employeeDepList,
  employeePosList,
  employeeStatusList,
} from "../constants/employeeConstants.js";

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Set first name for employee"],
    },
    lastName: {
      type: String,
      required: [true, "Set last name for employee"],
    },
    middleName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    birthDate: {
      type: String,
      required: [true, "Set birthDate for employee"],
    },
    department: {
      type: String,
      enum: employeeDepList,
      required: [true, "Set employee department"],
    },
    position: {
      type: String,
      enum: employeePosList,
      required: [true, "Set employee position"],
    },
    email: {
      type: String,
      required: [true, "Set employee email"],
    },
    phone: {
      type: String,
      required: [true, "Set employee phone"],
    },
    socials: {
      linkedIn: String,
      facebook: String,
    },
    groups: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: employeeStatusList,
      default: "not specified",
    },
  },
  { versionKey: false, timestamps: true }
);

employeeSchema.post("save", handleSaveError);

employeeSchema.pre("findOneAndUpdate", setUpdateSettings);

employeeSchema.post("findOneAndUpdate", handleSaveError);

const Employee = model("employee", employeeSchema);

export default Employee;
