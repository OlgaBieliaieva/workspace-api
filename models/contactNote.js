import { Schema } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactNoteSchema = new Schema(
  {
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactNoteSchema.post("save", handleSaveError);

contactNoteSchema.pre("findOneAndUpdate", setUpdateSettings);

contactNoteSchema.post("findOneAndUpdate", handleSaveError);

const ContactNote = contactsDB.model("contactNote", contactNoteSchema);

export default ContactNote;
