import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const generateToken = (userDatas) => {
  try {
    //creating the payload for token generation
    const payload = {
      _id: userDatas._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
    return token;
  } catch (error) {
    return error;
  }
};

const decryptToken = (clientToken) => {
  try {
    const decodedToken = jwt.verify(clientToken, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return error;
  }
};

export default {
  generateToken,
  decryptToken,
};
