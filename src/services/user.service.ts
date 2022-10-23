import { User } from "../models/userModel";
import { IUser } from "../interface/user";
import jwt from "jsonwebtoken";

const createUser = async (params: IUser) => {
  try {
    return await User.create(params);
  } catch (error) {
    throw error;
  }
};

const findUsers = async (params = {} as Partial<IUser>) => {
  try {
    return await User.find(params);
  } catch (error) {
    throw error;
  }
};

const generateJWTToken = async (id: Object) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw error;
  }
};

export { createUser, findUsers, generateJWTToken };
