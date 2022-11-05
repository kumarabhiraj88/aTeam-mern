import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import userValidator from "../validators/userValidator.js";
const router = express.Router();

router.post(
  "/signin",
  userValidator.signInValidation,
  userValidator.requestValidationResult,
  userController.signIn
);
router.post("/logout", verifyToken(), userController.logOut);

export default router;
