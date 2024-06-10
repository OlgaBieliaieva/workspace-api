import Joi from "joi";

export const createGroupSchema = Joi.object({
  groupName: Joi.string().required(),
  owner: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format")
    .required(),
  admins: Joi.array().items(
    Joi.string()
      .hex()
      .message("invalid 'id' format")
      .length(24)
      .message("invalid 'id' format")
  ),
  members: Joi.array().items(
    Joi.string()
      .hex()
      .message("invalid 'id' format")
      .length(24)
      .message("invalid 'id' format")
  ),
  isActive: Joi.boolean(),
  note: Joi.string(),
});

export const updateGroupSchema = Joi.object({
  groupName: Joi.string(),
  owner: Joi.string()
    .hex()
    .message("invalid 'id' format")
    .length(24)
    .message("invalid 'id' format"),
  admins: Joi.array().items(
    Joi.string()
      .hex()
      .message("invalid 'id' format")
      .length(24)
      .message("invalid 'id' format")
  ),
  members: Joi.array().items(
    Joi.string()
      .hex()
      .message("invalid 'id' format")
      .length(24)
      .message("invalid 'id' format")
  ),
  isActive: Joi.boolean(),
  note: Joi.string(),
});
