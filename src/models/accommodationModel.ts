import mongoose from "mongoose";
import { selectFields } from "../services/helper.service";

export interface IAccomodation {
  name: string;
  profileImage: string;
  location: string;
  price: number;
  averageScore?: number;
}

const accommodationSchema = new mongoose.Schema<IAccomodation>({
  name: {
    type: String,
    required: [true, "Accommodation must have a name"],
    minLength: 3,
  },
  profileImage: {
    type: String,
    required: [true, "Accommodation must have a profile image"],
  },
  location: {
    type: String,
    required: [true, "Please, provide accommodationlocation"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price per night"],
  },
  averageScore: {
    type: Number,
    default: 4.5,
  },
});

accommodationSchema.pre("find", function (next) {
  selectFields(this, ["-__v"]);
  next();
});

export const Accommodation = mongoose.model(
  "Accommodation",
  accommodationSchema
);
