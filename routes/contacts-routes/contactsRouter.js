import express from "express";
import contactsControllers from "../../controllers/contactsControllers.js";
import authenticate from "../../middlewares/authenticate.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import upload from "../../middlewares/upload.js";
import parseArrays from "../../middlewares/parseArrays.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../../schemas/contactsSchema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAll);

contactsRouter.post(
  "/",
  authenticate,
  upload.single("avatar"),
  parseArrays,
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.delete(
  "/:id/avatar",
  authenticate,
  isValidId,
  contactsControllers.deleteAvatar
);

contactsRouter.patch(
  "/:id/avatar",
  authenticate,
  isValidId,
  upload.single("avatar"),
  contactsControllers.addAvatar
);

contactsRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  parseArrays,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.getById
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.deleteById
);

export default contactsRouter;
