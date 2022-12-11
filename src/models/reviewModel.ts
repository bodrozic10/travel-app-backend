import mongoose from "mongoose";
import { IReview } from "../interface/review";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    text: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Review = mongoose.model("Review", reviewSchema);
