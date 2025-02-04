import fs from "fs/promises";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpErrors.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import cloudinary from "../helpers/cloudinary.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await usersService.saveUser({
    ...req.body,
  });

  const { _id: id, subscriptionType: subscription } = newUser;
  const payload = {
    id,
    subscription,
  };

  const token = createToken(payload);
  await usersService.updateUser({ _id: id }, { token });

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscriptionType,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id, subscriptionType: subscription } = user;
  const payload = {
    id,
    subscription,
  };

  const token = createToken(payload);
  await usersService.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar.avatarUrl,
      subscription: user.subscriptionType,
    },
  });
};

const getCurrent = (req, res) => {
  const {
    _id: id,
    name,
    email,
    avatar,
    subscriptionType: subscription,
  } = req.user;
  res.json({
    user: {
      id,
      name,
      email,
      avatar: avatar.avatarUrl,
      subscription,
    },
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await usersService.updateUser({ _id }, { token: null });
  res.status(204).json();
};

const addAvatar = async (req, res) => {
  const { _id: id, name, email, subscriptionType: subscription } = req.user;

  if (!req.file) {
    throw HttpError(400, "File not uploaded");
  }

  try {
    const { public_id: newAvatarId, secure_url: newAvatarUrl } =
      await cloudinary.uploader.upload(req.file.path, {
        folder: "workspace_avatars",
      });

    const user = await usersService.findUser(id);

    if (user.avatar?.avatarId) {
      await cloudinary.uploader.destroy(user.avatar.avatarId);
    }

    await usersService.updateUser(
      { _id: id },
      { avatar: { avatarId: newAvatarId, avatarUrl: newAvatarUrl } }
    );

    res.status(200).json({
      user: {
        id,
        name,
        email,
        subscription,
        avatar: newAvatarUrl,
      },
    });
  } catch (error) {
    throw HttpError(400, error.message);
  } finally {
    await fs.unlink(req.file.path); // Видалення тимчасового файлу
  }
};

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscriptionType } = req.body;

  if (!subscriptionType) {
    throw HttpError(400, "Missing required field: subscriptionType");
  }

  const allowedSubscriptions = ["Free", "Premium"];
  if (!allowedSubscriptions.includes(subscriptionType)) {
    throw HttpError(
      400,
      `Invalid subscription type. Allowed types: ${allowedSubscriptions.join(
        ", "
      )}`
    );
  }

  try {
    // Оновлення типу підписки користувача
    const updatedUser = await usersService.updateUser(
      { _id: id },
      { subscriptionType }
    );

    if (!updatedUser) {
      throw HttpError(404, "User not found");
    }

    res.status(200).json({
      user: {
        id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar.avatarUrl,
        subscription: updatedUser.subscriptionType,
      },
    });
  } catch (error) {
    throw HttpError(500, error.message);
  }
};

export default {
  signup: ctrlWrapper(signup),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  addAvatar: ctrlWrapper(addAvatar),
  updateSubscription: ctrlWrapper(updateSubscription),
};
