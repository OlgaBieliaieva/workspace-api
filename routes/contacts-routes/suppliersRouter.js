import express from "express";
import suppliersControllers from "../../controllers/suppliersControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createSupplierSchema,
  updateSupplierSchema,
} from "../../schemas/suppliersSchema.js";

const suppliersRouter = express.Router();

suppliersRouter.get("/", suppliersControllers.getAll);

suppliersRouter.get("/:id", isValidId, suppliersControllers.getSupplierById);

suppliersRouter.delete("/:id", isValidId, suppliersControllers.deleteById);

suppliersRouter.post(
  "/",
  isEmptyBody,
  validateBody(createSupplierSchema),
  suppliersControllers.createSupplier
);

suppliersRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateSupplierSchema),
  suppliersControllers.updateSupplier
);

export default suppliersRouter;
