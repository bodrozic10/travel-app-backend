import { IUser, IUserCredentials } from "../interface/user";
import { User } from "../models/userModel";
import { generateJWTToken } from "./auth.helper.service";

const signupUser = async (params: IUser) => {
  try {
    return await User.create(params);
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
    const query = User.findOne({ email }).select("+password");
    const user = await query;
    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    return await generateJWTToken(user._id);
  } catch (error) {
    throw error;
  }
};

export { loginUser, signupUser };
