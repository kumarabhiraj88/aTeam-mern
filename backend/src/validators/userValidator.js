import validator from "express-validator";
import messageHelper from "../helpers/messages.js";
import responseHelper from "../helpers/response.js";

const { check, validationResult } = validator;

const signInValidation = [
  check("Username").isEmail().withMessage("Username should be Email Id"),
  check("Password")
    // .isLength({ min: 8 })
    // .withMessage(
    //   "Passwords should be a minimum of 8 letters with a combination of at least one number, one special character, and one Capital letter."
    // ),
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Passwords should be a minimum of 8 letters with a combination of at least one number, one special character, and one Capital letter."
    ),
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
  signInValidation,
  requestValidationResult,
};
