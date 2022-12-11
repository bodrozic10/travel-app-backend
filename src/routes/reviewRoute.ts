import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController";
import { protect } from "../controllers/authController";

const router = Router({ mergeParams: true });

router.route("/").get(getReviews).post(protect, createReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
