import { Schema } from "mongoose";
import { contactsDB } from "../db.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

import { employeeStatusList } from "../constants/employeeConstants.js";

const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Set first name"],
    },
    lastName: {
      type: String,
      required: [true, "Set last name"],
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
      type: Date,
      default: "",
    },
    hireDate: {
      type: Date,
      default: "",
    },
    contactType: {
      type: String,
      enum: ["employee", "client_person", "supplier_person"],
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    department: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "Set phone"],
    },
    socials: {
      linkedIn: String,
      facebook: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: employeeStatusList,
      default: "not specified",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = contactsDB.model("contact", contactSchema);

export default Contact;
