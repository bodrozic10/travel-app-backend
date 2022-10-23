import { findDocuments, createDocument } from "./helper.service";
import { IAccomodation, Accommodation } from "../models/accommodationModel";

const findAccommodations = async (params = {} as Partial<IAccomodation>) => {
  try {
    return await findDocuments(Accommodation, params);
  } catch (error) {
    throw error;
  }
};

const createAccommodation = async (params = {} as Partial<IAccomodation>) => {
  try {
    return await createDocument(Accommodation, params);
  } catch (error) {
    throw error;
  }
};

export { findAccommodations, createAccommodation };
