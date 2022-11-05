import express from "express";
import productController from "../controllers/productController.js";
import productValidator from "../validators/productValidator.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/getProducts", verifyToken(), productController.getProducts);
router.post(
  "/addProduct",
  verifyToken(),
  productValidator.addProductValidation,
  productValidator.requestValidationResult,
  productController.addProduct
);
router.get(
  "/:productId/details",
  verifyToken(),
  productController.productDetails
);
router.put(
  "/:productId",
  verifyToken(),
  productValidator.addProductValidation,
  productValidator.requestValidationResult,
  productController.updateProduct
);

export default router;
