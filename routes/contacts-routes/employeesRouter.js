import express from "express";
import employeesControllers from "../../controllers/employeesControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeStatusSchema,
  updateEmployeeGroupsSchema,
} from "../../schemas/employeesSchema.js";

const employeesRouter = express.Router();

employeesRouter.get("/", employeesControllers.getAllEmployees);

employeesRouter.get("/:id", isValidId, employeesControllers.getEmployeeById);

employeesRouter.delete("/:id", isValidId, employeesControllers.deleteById);

employeesRouter.post(
  "/",
  isEmptyBody,
  validateBody(createEmployeeSchema),
  employeesControllers.createEmployee
);

employeesRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeSchema),
  employeesControllers.updateEmployee
);

employeesRouter.patch(
  "/:id/status",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeStatusSchema),
  employeesControllers.updateEmployeeStatus
);

employeesRouter.patch(
  "/:id/groups",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeGroupsSchema),
  employeesControllers.updateEmployeeGroups
);

export default employeesRouter;
