import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpErrors.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

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
      subscription: user.subscriptionType,
    },
  });
};

const getCurrent = (req, res) => {
  const { _id: id, name, email, subscriptionType: subscription } = req.user;
  res.json({
    user: {
      name,
      id,
      email,
      subscription,
    },
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await usersService.updateUser({ _id }, { token: null });
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
};
