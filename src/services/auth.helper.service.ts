import jwt from "jsonwebtoken";

const generateJWTToken = async (id: Object) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw error;
  }
};

export { generateJWTToken };
