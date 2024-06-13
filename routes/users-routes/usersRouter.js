import express from "express";
import usersControllers from "../../controllers/usersControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";
import validateBody from "../../helpers/validateBody.js";
import {
  signUserSchema,
  //   updateEmployeeSchema,
  //   updateEmployeeStatusSchema,
  //   updateEmployeeGroupsSchema,
} from "../../schemas/usersSchema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(signUserSchema),
  usersControllers.signup
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(signUserSchema),
  usersControllers.signIn
);

usersRouter.get("/current", authenticate, usersControllers.getCurrent);

usersRouter.post("/signout", authenticate, usersControllers.signOut);

// usersRouter.get("/", usersControllers.getAllUsers);

// usersRouter.get("/:id", isValidId, employeesControllers.getEmployeeById);

// usersRouter.delete("/:id", isValidId, employeesControllers.deleteById);

// usersRouter.put(
//   "/:id",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateEmployeeSchema),
//   employeesControllers.updateEmployee
// );

// usersRouter.patch(
//   "/:id/status",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateEmployeeStatusSchema),
//   employeesControllers.updateEmployeeStatus
// );

// usersRouter.patch(
//   "/:id/groups",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateEmployeeGroupsSchema),
//   employeesControllers.updateEmployeeGroups
// );

export default usersRouter;
