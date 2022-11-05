import validator from "express-validator";
import messageHelper from "../helpers/messages.js";
import responseHelper from "../helpers/response.js";

const { check, validationResult } = validator;

const addProductValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("color").notEmpty().withMessage("Colour is required"),
  check("vitamin").notEmpty().withMessage("Vitamin is required"),
];

const updateProductValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("color").notEmpty().withMessage("Colour is required"),
  check("vitamin").notEmpty().withMessage("Vitamin is required"),
];

const requestValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    responseHelper.failure(res, errors.array()[0].msg);
  } else {
    next();
  }
};

export default {
  addProductValidation,
  updateProductValidation,
  requestValidationResult,
};
