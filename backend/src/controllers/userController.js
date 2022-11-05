import UserModel from "../models/user.js";
import responseHelper from "../helpers/response.js";
import messageHelper from "../helpers/messages.js";

import jwtHelper from "../../helpers/jwt.js";
import bcrypt from "bcrypt";

const signIn = async (req, res, next) => {
  try {
    let userExists = await UserModel.findOne({ email: req.body.email });
    if (!userExists) {
      responseHelper.failure(res, messageHelper.INVALID_CREDENTIALS);
    }
    //passing the password from the front end to the function which is defined with the userSchema to compare password
    if (!userExists.authenticate(req.body.password)) {
      responseHelper.failure(res, messageHelper.INVALID_CREDENTIALS);
    }
    const { name, email } = userExists;
    let authToken = jwtHelper.generateToken(userExists);
    const responseData = {
      token: authToken,
      user: { name, email },
    };
    res.status(200).json({ responseData });
  } catch (error) {
    next(error);
  }
};

export default {
  signIn,
};
