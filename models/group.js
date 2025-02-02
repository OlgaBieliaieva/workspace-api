import { Schema } from "mongoose";
import { contactsDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: [true, "Set group name"],
    },
    groupDescription: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "Contact",
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "Contact",
    },    
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    
  },
  { versionKey: false, timestamps: true }
);

groupSchema.post("save", handleSaveError);

groupSchema.pre("findOneAndUpdate", setUpdateSettings);

groupSchema.post("findOneAndUpdate", handleSaveError);

const Group = contactsDB.model("group", groupSchema);

export default Group;
