import mongoose from "mongoose";
import {
  IAccomodation,
  AccommodationType,
  Ammenities,
} from "../interface/accommodation";

const accommodationSchema = new mongoose.Schema<IAccomodation>(
  {
    name: {
      type: String,
      required: [true, "Accommodation must have a name"],
      minLength: 3,
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
    amenities: {
      type: [String],
      enum: Ammenities,
    },
    accommodationType: {
      type: String,
      enum: AccommodationType,
    },
    description: {
      type: String,
    },
    maxGuests: {
      type: Number,
      required: [true, "Please provide max guests"],
    },
    numBeds: {
      type: Number,
      required: [true, "Please provide number of beds"],
    },
    numBaths: {
      type: Number,
      required: [true, "Please provide number of baths"],
    },
    images: {
      type: [String],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

accommodationSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "accommodation",
});

// accommodationSchema.pre(
//   /^find/,
//   function (this: mongoose.Query<{}, IAccomodation>, next) {
//     this.populate({
//       path: "host",
//       select: "username",
//     }).populate({
//       path: "reviews",
//     });
//     next();
//   }
// );

export const Accommodation = mongoose.model(
  "Accommodation",
  accommodationSchema
);
