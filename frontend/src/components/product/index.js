import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../common/pageHeading.js";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import {
  getProducts,
  getProductDetails,
  emptyProductDetails,
} from "../../redux/actions/productActions.js";
import * as productTypes from "../../redux/types/productTypes.js";
import AddProduct from "./addProduct";
import "../../styles/components/product.css";

const Product = () => {
  const dispatch = useDispatch();

  const [addProductModalState, toggleaddProductModalState] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const toggleAddProductModal = async () => {
    toggleaddProductModalState(!addProductModalState);
    setEditProduct(false);
    dispatch(emptyProductDetails());
  };

  const editFunc = async (id) => {
    dispatch(getProductDetails(id));
    setEditProduct(true);
    toggleaddProductModalState(!addProductModalState);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { productlist, productDetail } = useSelector(
    (state) => state.productReducer
  );

  return (
    <div className="product">
      <PageHeading
        heading="Products"
        showButton={true}
        buttonLabel="New"
        showSearch={true}
        onClick={toggleAddProductModal}
      />

      <MTable
        tableData={productlist.items}
        contentFlag={productTypes.PRODUCT_FLAG}
        editFunc={editFunc}
      />
      <ModalComponent
        title={editProduct ? "Edit Product" : "Add Product"}
        modalState={addProductModalState}
        message={
          <AddProduct
            toggleModal={toggleAddProductModal}
            editFlag={editProduct}
            productDetail={productDetail}
          />
        }
        toggleModal={toggleAddProductModal}
      />
    </div>
  );
};

export default Product;
