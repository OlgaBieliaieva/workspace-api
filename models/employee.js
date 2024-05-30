import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

import {
  employeeDepList,
  employeePosList,
} from "../constants/employeeConstants.js";

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Set first name for contact"],
    },
    lastName: {
      type: String,
      required: [true, "Set last name for contact"],
    },
    middleName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
    },
    birthDate: {
      type: String,
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
    },
    phone: {
      type: String,
    },
    socials: {
      linkedIn: String,
      facebook: String,
    },
  },
  { versionKey: false, timestamps: true }
);

employeeSchema.post("save", handleSaveError);

employeeSchema.pre("findOneAndUpdate", setUpdateSettings);

employeeSchema.post("findOneAndUpdate", handleSaveError);

const Employee = model("employee", employeeSchema);

export default Employee;
