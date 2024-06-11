import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as usersService from "../services/usersServices.js";
import * as employeesService from "../services/employeesServices.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  let status = "guest";
  const isEmployee = await employeesService.getOne({ email });
  if (isEmployee) {
    status = "employee";
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
      id: newUser._id,
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

// const getCurrent = (req, res) => {
//   const { _id: id, name, email } = req.user;
//   res.json({
//     user: {
//       id,
//       name,
//       email,
//     },
//   });
// };

const signOut = async (req, res) => {
  const { _id } = req.user;
  await usersService.updateUser({ _id }, { token: null });
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signIn: ctrlWrapper(signIn),
  //   getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
};
