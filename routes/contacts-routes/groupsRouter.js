import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import groupsControllers from "../../controllers/groupsControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createGroupSchema,
  updateGroupSchema,
} from "../../schemas/groupsSchema.js";

const groupsRouter = express.Router();

groupsRouter.get("/", authenticate, groupsControllers.getAll);

groupsRouter.get("/:id", isValidId, groupsControllers.getGroupById);

groupsRouter.delete("/:id", isValidId, groupsControllers.deleteById);

groupsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createGroupSchema),
  groupsControllers.createGroup
);

groupsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateGroupSchema),
  groupsControllers.updateGroup
);

export default groupsRouter;
