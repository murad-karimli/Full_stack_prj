const bcrypt = require("bcrypt");

export const hashPassword = async (plainTextPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
