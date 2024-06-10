import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: [true, "Set group name"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "employee",
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "employee",
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "employee",
      ref: "supplier",
      ref: "client",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

groupSchema.post("save", handleSaveError);

groupSchema.pre("findOneAndUpdate", setUpdateSettings);

groupSchema.post("findOneAndUpdate", handleSaveError);

const Group = model("group", groupSchema);

export default Group;
