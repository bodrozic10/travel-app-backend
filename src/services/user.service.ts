import { User } from "../models/userModel";
import { IUser } from "../interface/user";

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

export { createUser, findUsers };
