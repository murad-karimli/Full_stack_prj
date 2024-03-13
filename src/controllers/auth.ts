import express from "express";
import { createUser, getUserByEmail } from "../models/users";
import { checkAndRegister } from "../services/user";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const response = await checkAndRegister(req.body);

    if (response.success === false) {
      console.log("User already registered:", response.message);
      res.status(400).send(response.message);
    } else {
      const user = await createUser(response.user);
      console.log("User registered successfully:", user);
      res.status(200).send({username:user.username,email:user.email,pass:user.password});
    }
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).send('Internal Server Error');
  }
};
