import { User } from "../models/userModel";
import { IUser, IUserCredentials } from "../interface/user";
import { generateJWTToken, comparePassword } from "./user.helper.service";

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

const loginUser = async (params: IUserCredentials) => {
  try {
    const { email, password } = params;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    console.log("email", email);
    const query = User.findOne({ email }).select("+password");
    const user = await query;
    console.log(user);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    return await generateJWTToken(user._id);
  } catch (error) {
    throw error;
  }
};

export { createUser, findUsers, generateJWTToken, loginUser };
