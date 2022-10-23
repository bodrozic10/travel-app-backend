import { IUser, User } from "../models/userModel";
import { createDocument, findDocuments } from "./helper.service";

const createUser = async (params = {} as Partial<IUser>) => {
  try {
    return await createDocument(User, params);
  } catch (error) {
    throw error;
  }
};

const findUsers = async (params = {} as Partial<IUser>) => {
  try {
    return await findDocuments(User, params);
  } catch (error) {
    throw error;
  }
};

export { createUser, findUsers };
