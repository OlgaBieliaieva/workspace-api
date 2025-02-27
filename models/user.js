import { Schema } from "mongoose";
import { usersDB } from "../db.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { employeeStatusList } from "../constants/employeeConstants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      avatarId: {
        type: String,
        default: null,
      },
      avatarUrl: {
        type: String,
        default: null,
      },
    },
    status: {
      type: String,
      enum: employeeStatusList,
      default: "not specified",
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free",
    },
    workspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
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
