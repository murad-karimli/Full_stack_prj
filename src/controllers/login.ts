import express from "express";
import { loginUser } from "../services/login";
import { authSchema } from "../schemas/user";

export const authUser = async (req: express.Request, res: express.Response) => {
  try {
    const validatedData = await authSchema.validateAsync(req.body);
    console.log(validatedData)
    const authenticate = await loginUser(validatedData);

    res.send({ authenticate });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(error.statusCode).send(error);
  }
};
