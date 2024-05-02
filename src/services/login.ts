import { getUserByEmail } from "../models/users";
import { LoginError } from "../helpers/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logAsync } from "../controllers/logger";

require("dotenv").config();

enum AuthErrors {
  UserDoesNotExist = "User does not exists",
  InvalidPassword = "Password is invalid",
}

interface UserData {
  email: string;
  password: string;
  access_token?: string;
}

export const loginUser = async (userData: any): Promise<any> => {
  try {
    const { email, password } = userData;

    const user = await getUserByEmail(email);
    if (!user)
      throw new LoginError({
        name: AuthErrors.UserDoesNotExist,
        message: "User is not found with this email address",
        statusCode: 404,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new LoginError({
        name: AuthErrors.InvalidPassword,
        message: "You have entered incorrect password",
        statusCode: 422,
      });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d", 
      }
    );

    return { success: true, data: { email: user.email, username: user.username, access_token: accessToken, refresh_token: refreshToken } };
  } catch (err) {
    console.log("error happened in login", err);
    throw err;
  }
};

