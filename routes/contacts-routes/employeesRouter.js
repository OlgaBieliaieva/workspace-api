import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  deleteById,
  createEmployee,
  updateEmployee,
  updateEmployeeStatus,
  updateEmployeeGroups,
} from "../../controllers/employeesControllers.js";
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

employeesRouter.get("/", getAllEmployees);

employeesRouter.get("/:id", isValidId, getEmployeeById);

employeesRouter.delete("/:id", isValidId, deleteById);

employeesRouter.post(
  "/",
  isEmptyBody,
  validateBody(createEmployeeSchema),
  createEmployee
);

employeesRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeSchema),
  updateEmployee
);

employeesRouter.patch(
  "/:id/status",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeStatusSchema),
  updateEmployeeStatus
);

employeesRouter.patch(
  "/:id/groups",
  isValidId,
  isEmptyBody,
  validateBody(updateEmployeeGroupsSchema),
  updateEmployeeGroups
);

export default employeesRouter;
