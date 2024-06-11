import { Schema, model } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const supplierSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Set first name for supplier"],
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

supplierSchema.post("save", handleSaveError);

supplierSchema.pre("findOneAndUpdate", setUpdateSettings);

supplierSchema.post("findOneAndUpdate", handleSaveError);

const Supplier = contactsDB.model("supplier", supplierSchema);

export default Supplier;
