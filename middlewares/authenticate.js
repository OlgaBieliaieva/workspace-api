import HttpError from "../helpers/HttpErrors.js";

import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/usersServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header not found"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = verifyToken(token);
    const user = await findUser({ _id: id });

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    if (!user.token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
