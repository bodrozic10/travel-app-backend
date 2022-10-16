import mongoose from "mongoose";
import { findDocuments } from "./";
import { IAccomodation } from "../models";

const findAccommodations = async (
  Model: mongoose.Model<IAccomodation>,
  params: Object = {}
) => {
  try {
    return await findDocuments(Model, params);
  } catch (error) {
    throw error;
  }
};

export { findAccommodations };
