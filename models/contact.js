import { Schema } from "mongoose";
import { contactsDB } from "../db.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const phoneSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["work", "home", "mobile", "other"],
      default: "mobile",
    },
    number: { type: String, required: true },
  },
  { _id: false }
);

const emailSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["work", "personal", "other"],
      default: "work",
    },
    address: { type: String, required: true },
  },
  { _id: false }
);

const socialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: [
        "LinkedIn",
        "Facebook",
        "Telegram",
        "Twitter",
        "Instagram",
        "Other",
      ],
      required: true,
    },
    url: { type: String, required: true },
  },
  { _id: false }
);

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
      default: null,
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
    birthDate: {
      type: Date,
      default: null,
    },
    hireDate: {
      type: Date,
      default: null,
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
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    phones: [phoneSchema],
    emails: {
      type: [emailSchema],
      default: [],
    },
    socials: {
      type: [socialSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    sharedWorkspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
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
