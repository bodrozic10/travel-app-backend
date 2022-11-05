import { User } from "../models/userModel";
import { IUser } from "../interface/user";

const findUsers = async (params = {} as Partial<IUser>) => {
  try {
    return await User.find(params);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: string, params: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, params, {
      runValidators: true,
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export { findUsers, deleteUser, updateUser };
