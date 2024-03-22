import { getUserByEmail } from "../models/users";
import { LoginError } from "../helpers/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const loginUser = async (userData: any): Promise<any> => {
  const { email, password } = userData.body;
  if (!email || !password) {
    throw new LoginError({
      name: "EMAIL_AND_PASSWORD_REQUIRED",
      message: "Password and email are required for logging in",
    });
  }

  const user = await getUserByEmail(email);

  if (!user)
    throw new LoginError({
      name: "USER_DOES_NOT_FOUND",
      message: "User is not found with this email address",
    });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new LoginError({
      name: "INVALID_PASSWORD",
      message: "You have entered incorrect password",
    });
  console.log(isPasswordValid);
  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  console.log(accessToken);
  const data = {
    success: true,
    message: "User is authenticated",
    username: userData.username,
    email: userData.username,
    _id: userData._id,
    access_token: accessToken,
  };
  return { success: true, data };
};
