import express from "express";
import clientsControllers from "../../controllers/clientsControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../helpers/validateBody.js";
import {
  createClientSchema,
  updateClientSchema,
} from "../../schemas/clientsSchema.js";

const clientsRouter = express.Router();

clientsRouter.get("/", clientsControllers.getAll);

clientsRouter.get("/:id", isValidId, clientsControllers.getClientById);

clientsRouter.delete("/:id", isValidId, clientsControllers.deleteById);

clientsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createClientSchema),
  clientsControllers.createClient
);

clientsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateClientSchema),
  clientsControllers.updateClient
);

export default clientsRouter;
