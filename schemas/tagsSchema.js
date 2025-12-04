import Joi from "joi";

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

export const createTagSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().allow(null, ""),
  color: Joi.string()
    .pattern(/^#?[0-9A-Fa-f]{6}$/)
    .allow(null),
  modules: Joi.array()
    .items(
      Joi.string().valid(
        "contacts",
        "tasks",
        "calendar",
        "projects",
        "messages"
      )
    )
    .default([]),

  gmailLabelId: Joi.string().allow(null, ""),
  trelloLabelId: Joi.string().allow(null, ""),
  trelloBoardId: Joi.string().allow(null, ""),
});

export const updateTagSchema = Joi.object({
  name: Joi.string().min(1),
  description: Joi.string().allow(null, ""),
  color: Joi.string()
    .pattern(/^#?[0-9A-Fa-f]{6}$/)
    .allow(null),
  modules: Joi.array().items(
    Joi.string().valid("contacts", "tasks", "calendar", "projects", "messages")
  ),

  gmailLabelId: Joi.string().allow(null, ""),
  trelloLabelId: Joi.string().allow(null, ""),
  trelloBoardId: Joi.string().allow(null, ""),
})
  .min(1)
  .messages({ "object.min": "At least one field must be updated." });
