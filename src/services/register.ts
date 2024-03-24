import { getAUser } from "../models/users";
import { hashPassword } from "../helpers/index";
import { RegisterError } from "../helpers/errors";
import { logAsync } from "../controllers/logger";
enum RegisterErrors {
  AlreadyRegistered = "Email is already registered",
}

export const checkAndRegister = async (userData: any): Promise<any> => {
  try {
    const user = await getAUser(userData.email);

    if (user !== null) {
      throw new RegisterError({
        name: RegisterErrors.AlreadyRegistered,
        message: `${userData.email} is already registered`,
        statusCode:422
      });
    }
    const hashedPassword = await hashPassword(userData.password);
    return {
      user: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    };
  } catch (err) {
    await logAsync("error","error happened in registering user")
    console.error("Error in checkAndRegister:", err);
    throw err;
  }
};
