import express from "express";
import usersControllers from "../../controllers/usersControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";
import validateBody from "../../helpers/validateBody.js";
import {
  signUpUserSchema,
  signInUserSchema,
  updateUserSubscriptionSchema,
  updateUserStatusSchema,
  updateProfileSchema,
} from "../../schemas/usersSchema.js";
import upload from "../../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(signUpUserSchema),
  usersControllers.signup
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(signInUserSchema),
  usersControllers.signIn
);

usersRouter.get("/current", authenticate, usersControllers.getCurrent);

usersRouter.post("/signout", authenticate, usersControllers.signOut);

usersRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  usersControllers.addAvatar
);

usersRouter.delete("/avatar", authenticate, usersControllers.deleteAvatar);

usersRouter.patch(
  "/status",
  authenticate,
  validateBody(updateUserStatusSchema),
  usersControllers.updateStatus
);

usersRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateUserSubscriptionSchema),
  usersControllers.updateSubscription
);

usersRouter.patch(
  "/profile",
  authenticate,
  validateBody(updateProfileSchema),
  usersControllers.updateProfile
);

export default usersRouter;
