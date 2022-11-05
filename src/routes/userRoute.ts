import express from "express";
import { getUsers, removeUser, updateMe } from "../controllers/userController";
import { signup, login, protect } from "../controllers/authController";

const router = express.Router();

router.route("/").get(getUsers).patch(protect, updateMe);
router.route("/:id").delete(removeUser);

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;
