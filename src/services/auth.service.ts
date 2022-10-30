import { IUser, IUserCredentials } from "../interface/user";
import { User } from "../models/userModel";
import { generateJWTToken, verifyJWTToken } from "./auth.helper.service";

const signupUser = async (params: IUser) => {
  try {
    const user = await User.create(params);
    return await generateJWTToken(user._id);
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

const protectRoute = async (token: string | null) => {
  try {
    if (!token) {
      throw new Error("You are not logged in! Please log in to get access");
    }
    const decoded = await verifyJWTToken(token);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("The user belonging to this token does no longer exist.");
    }
    if (currentUser.changedPasswordAfter(decoded.iat as number)) {
      throw new Error("User recently changed password! Please log in again.");
    }
    return currentUser;
  } catch (error) {
    throw error;
  }
};

export { loginUser, signupUser, protectRoute };
