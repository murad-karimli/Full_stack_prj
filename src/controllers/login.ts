import express from "express";
import { loginUser } from "../services/login";

export const authUser = async (req: express.Request, res: express.Response) => {
  try {
    const authenticate = await loginUser(req);
    res.send({ authenticate });
  } catch (err) {
    res.send(err);
  }
};
