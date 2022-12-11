import { Accommodation } from "../models/accommodationModel";
import { IAccomodation } from "../interface/accommodation";

const findAccommodations = async (params = {} as Partial<IAccomodation>) => {
  try {
    return await Accommodation.find(params);
  } catch (error) {
    throw error;
  }
};

const createAccommodation = async (params: IAccomodation) => {
  try {
    return await Accommodation.create(params);
  } catch (error) {
    throw error;
  }
};

const findAccommodation = async (id: string) => {
  try {
    return await Accommodation.findById(id)
      .populate("host")
      .populate("reviews");
  } catch (error) {
    throw error;
  }
};

const searchSuggestions = async (name: string) => {
  try {
    const regex = new RegExp(name as string, "i");
    return await Accommodation.find({
      name: { $regex: regex },
    });
  } catch (error) {
    throw error;
  }
};

export {
  findAccommodations,
  createAccommodation,
  findAccommodation,
  searchSuggestions,
};
