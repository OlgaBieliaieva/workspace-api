import { Schema, model } from "mongoose";
import { usersDB } from "../db.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: {
      type: String,
      default: "guest",
    },
    role: {
      type: String,
      default: "user",
    },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = usersDB.model("user", userSchema);

export default User;
