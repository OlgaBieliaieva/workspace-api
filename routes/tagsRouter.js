import express from "express";
import tagsControllers from "../controllers/tagsControllers.js";
import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";

import { createTagSchema, updateTagSchema } from "../schemas/tagsSchema.js";

const tagsRouter = express.Router();

tagsRouter.get("/", authenticate, tagsControllers.getAll);

tagsRouter.get("/:id", authenticate, isValidId, tagsControllers.getById);

tagsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(createTagSchema),
  tagsControllers.createTag
);

tagsRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(updateTagSchema),
  tagsControllers.updateTag
);

tagsRouter.delete("/:id", authenticate, isValidId, tagsControllers.deleteTag);

export default tagsRouter;
