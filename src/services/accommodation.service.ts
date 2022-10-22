import mongoose from "mongoose";
import { findDocuments, createDocument } from "./helper.service";
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

const createAccommodation = async (
  Model: mongoose.Model<IAccomodation>,
  params: Object = {}
) => {
  try {
    return await createDocument(Model, params);
  } catch (error) {
    throw error;
  }
};

export { findAccommodations, createAccommodation };
