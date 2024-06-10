import express from "express";
import companiesControllers from "../../controllers/companiesControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../../schemas/companiesSchema.js";

const companiesRouter = express.Router();

companiesRouter.get("/", companiesControllers.getAllCompanies);

companiesRouter.get("/:id", isValidId, companiesControllers.getCompanyById);

companiesRouter.delete("/:id", isValidId, companiesControllers.deleteById);

companiesRouter.post(
  "/",
  isEmptyBody,
  validateBody(createCompanySchema),
  companiesControllers.createCompany
);

companiesRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateCompanySchema),
  companiesControllers.updateCompany
);

export default companiesRouter;
