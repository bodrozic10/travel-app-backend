import { IReview } from "../interface/review";
import { Review } from "../models/reviewModel";

export const getAllReviews = async (accommodationId: string) => {
  try {
    return await Review.find({ accommodation: accommodationId });
  } catch (err: any) {
    throw err;
  }
};

export const addReview = async (params: Partial<IReview>) => {
  try {
    const review = await Review.create(params);
    return review;
  } catch (err: any) {
    throw err;
  }
};
