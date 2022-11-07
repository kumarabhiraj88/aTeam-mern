import UserModel from "../models/user.js";
import responseHelper from "../helpers/response.js";
import messageHelper from "../helpers/messages.js";

import jwtHelper from "../helpers/jwt.js";
import bcrypt from "bcrypt";

const signIn = async (req, res, next) => {
  try {
    let userExists = await UserModel.findOne({ email: req.body.Username });
    if (!userExists) {
      responseHelper.failure(res, messageHelper.INVALID_CREDENTIALS);
    }
    //passing the password from the front end to the function which is defined with the userSchema to compare password
    if (!userExists.authenticate(req.body.Password)) {
      responseHelper.failure(res, messageHelper.INVALID_CREDENTIALS);
    }
    const { _id, fullName, email } = userExists;
    let authToken = jwtHelper.generateToken(userExists);
    const responseData = {
      token: authToken,
      user: { _id, fullName, email },
    };
    responseHelper.data(res, responseData, 200);
  } catch (error) {
    responseHelper.failure(res, error);
  }
};

const logOut = async (req, res) => {
  try {
    //decrypted user details from token within verifyToken middleware is passed to the request
    //userId within this request checking with database user document
    let userExists = await Usermodel.findOne({ _id: req.user.userId });
    if (!userExists) {
      throw Error(messageHelper.USER_NOT_FOUND);
    }
    //next write the code to remove this user from session on table
    responseHelper.success(res, messageHelper.LOGOUT_SUCCESS, 200);
  } catch (error) {
    responseHelper.failure(res, error);
  }
};

export default {
  signIn,
  logOut,
};
