import ProductModel from "../models/product.js";
import responseHelper from "../helpers/response.js";
import messageHelper from "../helpers/messages.js";

const getProducts = async (req, res, next) => {
  try {
    let query = req.query.query;
    let criteria = {
      $or: [{ name: { $regex: query } }, { price: { $regex: query } }],
    };
    let productlist = ProductModel.find(criteria).select(
      "name price color vitamin"
    );
    let totalProductsCount = await ProductModel.countDocuments(criteria);
    responseHelper.page(res, productlist, totalProductsCount, skip, 200);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, price, color, vitamin } = req.body;

    let saveProduct = await new ProductModel({
      name,
      price,
      color,
      vitamin,
    }).save();
    responseHelper.data(res, saveProduct, 200, messageHelper.PRODUCT_ADDED);
  } catch (error) {}
};

const productDetails = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      throw Error(messageHelper.PRODUCT_NOT_EXIST);
    }
    responseHelper.data(res, product, 200);
  } catch (error) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, price, color, vitamin } = req.body;
    var newvalues = {
      $set: { name: name, price: price, color: color, vitamin: vitamin },
    };

    let result = await ProductModel.updateOne({ _id: productId }, newvalues);
    responseHelper.data(res, result, 200, messageHelper.PRODUCT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  addProduct,
  productDetails,
  updateProduct,
};
