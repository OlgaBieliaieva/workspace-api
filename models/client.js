import { Schema, model } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Set first name for client"],
    },
    lastName: {
      type: String,
      default: "",
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
      default: "",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
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
      required: [true, "Set supplier phone"],
    },
    socials: {
      linkedIn: String,
      facebook: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "employee",
    },
    groups: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    note: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

clientSchema.post("save", handleSaveError);

clientSchema.pre("findOneAndUpdate", setUpdateSettings);

clientSchema.post("findOneAndUpdate", handleSaveError);

const Client = contactsDB.model("client", clientSchema);

export default Client;
