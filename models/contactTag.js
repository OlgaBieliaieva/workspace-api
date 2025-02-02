import { Schema } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactTagSchema = new Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tag: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

contactTagSchema.post("save", handleSaveError);

contactTagSchema.pre("findOneAndUpdate", setUpdateSettings);

contactTagSchema.post("findOneAndUpdate", handleSaveError);

const ContactTag = contactsDB.model("contactTag", contactTagSchema);

export default ContactTag;
