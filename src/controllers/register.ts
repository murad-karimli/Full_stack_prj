require('dotenv').config()
import express from "express";
import { createUser, getUserByEmail } from "../models/users";
import { checkAndRegister } from "../services/register";
import { userSchema } from "../schemas/user";
import jwt from "jsonwebtoken"

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const validatedData = await userSchema.validateAsync(req.body);

    const response = await checkAndRegister(validatedData);

    const user = await createUser(response.user);
    const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    res
      .status(200)
      .send({
        username: user.username,
        email: user.email,
        pass: user.password,
        refresh_token:refreshToken
      });

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send("Internal Server Error");
  }
};
