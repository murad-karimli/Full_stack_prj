import jwt from "jsonwebtoken";
import { LoginError, AuthErrors } from "./errors";

export const verifyAccessToken = (accessToken: string) => {
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new LoginError({
          name: AuthErrors.TokenIsNotValid,
          message: "this token is not valid",
          statusCode: 403,
        });
      } else {
        return user;
      }
    });
  } else {
    throw new LoginError({
      name: AuthErrors.NotAuthenticated,
      message: "You are not authenticated",
      statusCode: 401,
    });
  }
};
