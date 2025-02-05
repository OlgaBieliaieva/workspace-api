import { Schema } from "mongoose";
import { workspacesDB } from "../db.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["owner", "admin", "member"],
          default: "member",
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

workspaceSchema.post("save", handleSaveError);

workspaceSchema.pre("findOneAndUpdate", setUpdateSettings);

workspaceSchema.post("findOneAndUpdate", handleSaveError);

const Workspace = workspacesDB.model("workspace", workspaceSchema);

export default Workspace;
