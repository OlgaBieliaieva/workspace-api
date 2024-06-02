import express from "express";
import {
  getAllCompanies,
  getCompanyById,
  deleteById,
  createCompany,
  updateCompany,
  //   updateEmployeeStatus,
  //   updateEmployeeGroups,
} from "../../controllers/companiesControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createCompanySchema,
  updateCompanySchema,
  //   updateEmployeeStatusSchema,
  //   updateEmployeeGroupsSchema,
} from "../../schemas/companiesSchema.js";

const companiesRouter = express.Router();

companiesRouter.get("/", getAllCompanies);

companiesRouter.get("/:id", isValidId, getCompanyById);

companiesRouter.delete("/:id", isValidId, deleteById);

companiesRouter.post(
  "/",
  isEmptyBody,
  validateBody(createCompanySchema),
  createCompany
);

companiesRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateCompanySchema),
  updateCompany
);

// employeesRouter.patch(
//   "/:id/status",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateEmployeeStatusSchema),
//   updateEmployeeStatus
// );

// employeesRouter.patch(
//   "/:id/groups",
//   isValidId,
//   isEmptyBody,
//   validateBody(updateEmployeeGroupsSchema),
//   updateEmployeeGroups
// );

export default companiesRouter;
