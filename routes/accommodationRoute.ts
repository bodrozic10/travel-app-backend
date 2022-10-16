import express from "express";
import { getAccommodations, createAccommodation } from "../controllers";

const router = express.Router();

router.route("/").get(getAccommodations).post(createAccommodation);

export default router;
