import mongoose, { Schema } from "mongoose";
import { contactsDB } from "../db.js"; // або globalDB якщо плануєш окрему БД

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: null,
    },

    user: {
      // власник тегу
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    color: {
      // hex або null
      type: String,
      default: null,
    },

    modules: {
      // На яких модулях тег доступний:
      // ['contacts', 'tasks', 'calendar', 'projects', 'messages']
      type: [String],
      default: [],
    },

    // ==== Integrations fields ====

    gmailLabelId: {
      // Якщо тег мапиться на Gmail Label
      type: String,
      default: null,
    },

    trelloLabelId: {
      // Якщо тег мапиться на Trello Label
      type: String,
      default: null,
    },

    trelloBoardId: {
      // Щоб знати до якої Trello board належить label
      type: String,
      default: null,
    },

    // ==== System fields ====

    isSynced: {
      // синхронізовано з інтеграціями
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// Hooks
tagSchema.post("save", handleSaveError);

tagSchema.pre("findOneAndUpdate", setUpdateSettings);

tagSchema.post("findOneAndUpdate", handleSaveError);

const Tag = contactsDB.model("tag", tagSchema);

export default Tag;
