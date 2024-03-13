import { getUserByEmail, createUser, getAUser } from "../models/users";
import { hashPassword } from "../helpers/index";
import express from "express";
import { userSchema } from "../schemas/user";

export const checkAndRegister = async (req: any): Promise<any> => {
  try {
    const result = await userSchema.validateAsync(req);

    const user = await getAUser(result.email);

    if (user == null) {
      const hashedPassword = await hashPassword(result.password);

      return {
        success: true,
        user: {
          username: result.username,
          email: result.email,
          password: hashedPassword,
        },
      };
    }

    return {
      success: false,
      message: `${result.email} is already registered`,
    };
  } catch (err) {
    console.error('Error in checkAndRegister:', err);
    return { success: false, message: err };
  }
};
