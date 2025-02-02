import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as usersService from "../services/usersServices.js";
import * as employeesService from "../services/employeesServices.js";
import * as suppliersService from "../services/suppliersServices.js";
import * as clientsService from "../services/clientsServices.js";
import HttpError from "../helpers/HttpErrors.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  let status = "guest";
  const employee = await employeesService.getOne({ email });
  const supplier = await suppliersService.getOne({ email });
  const client = await clientsService.getOne({ email });
  if (employee) {
    status = "employee";
  } else if (supplier) {
    status = "supplier";
  } else if (client) {
    status = "client";
  }
  const newUser = await usersService.saveUser({ ...req.body, status });

  const { _id: id } = newUser;
  const payload = {
    id,
  };

  const token = createToken(payload);
  await usersService.updateUser({ _id: id }, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.firstName,
      email: newUser.email,
      status: newUser.status,
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

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = createToken(payload);
  await usersService.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      status: user.status,
    },
  });
};

const getCurrent = (req, res) => {
  const { _id: id, email } = req.user;
  res.json({
    user: {
      id,
      email,
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
