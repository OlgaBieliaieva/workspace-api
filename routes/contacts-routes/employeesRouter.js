import express from "express";
import {
  //   getAllContacts,
  //   getOneContact,
  //   deleteContact,
  createEmployee,
  //   updateContact,
  //   updateStatusContact,
} from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
// import isValidId from "../middlewares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import {
  createEmployeeSchema,
  //   updateContactSchema,
  //   updateStatusContactSchema,
} from "../schemas/employeesSchema";

const employeesRouter = express.Router();

// employeesRouter.get("/", getAllContacts);

// contactsRouter.get("/:id", isValidId, getOneContact);

// contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createEmployeeSchema),
  createEmployee
);

// contactsRouter.put(
//   "/:id",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateContactSchema),
//   updateContact
// );

// contactsRouter.patch(
//   "/:id/favorite",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateStatusContactSchema),
//   updateStatusContact
// );

export default employeesRouter;
