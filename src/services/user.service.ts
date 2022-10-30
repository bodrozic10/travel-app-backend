import { User } from "../models/userModel";
import { IUser } from "../interface/user";

const findUsers = async (params = {} as Partial<IUser>) => {
  try {
    return await User.find(params);
  } catch (error) {
    throw error;
  }
};

export { findUsers };
