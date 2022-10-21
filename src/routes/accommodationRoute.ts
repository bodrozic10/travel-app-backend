import express from "express";
import {
  getAccommodations,
  createAccommodation,
} from "../controllers/accommodationController";

const router = express.Router();

router.route("/").get(getAccommodations).post(createAccommodation);

export default router;
