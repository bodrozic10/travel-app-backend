import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateJWTToken = async (id: Object) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    throw error;
  }
};

export { generateJWTToken, comparePassword };
