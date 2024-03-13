const SECRET='b536a4f3-d597-4136-bc01-58b9ef4a639f'
const bcrypt = require('bcrypt');
const saltRounds = 10; 

export const hashPassword = async (plainTextPassword:string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};