import express from "express";
import { loginUser } from "../services/login";
import { authSchema } from "../schemas/user";

export const authUser = async (req: express.Request, res: express.Response) => {
  try {

    const validatedData = await authSchema.validateAsync(req.body);

    const authenticate = await loginUser(validatedData);

    res.send({ authenticate });
  } catch (validationError) {
    res.status(400).send({ error: validationError.message });
  }
};
