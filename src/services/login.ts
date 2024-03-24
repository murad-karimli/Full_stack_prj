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
  } catch (err) {
   //await  logAsync("error","error happened in login")
    console.log("error happened in login", err);
    throw err;
  }
};
