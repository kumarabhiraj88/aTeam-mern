import React from "react";
import { Container, Button, Grid } from "@material-ui/core";
import { Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useFormValidation from "../../validators/useFormValidation";
import {
  addProductAction,
  updateProductAction,
} from "../../redux/actions/productActions";
import * as productTypes from "../../redux/types/productTypes.js";

const AddProduct = (props) => {
  const { toggleModal, editFlag, productDetail } = props;

  let INITIAL_STATE = {
    productId: editFlag ? productDetail._id : "",
    name: editFlag ? productDetail.name : "",
    price: editFlag ? productDetail.price : "",
    color: editFlag ? productDetail.color : "",
    vitamin: editFlag ? productDetail.vitamin : "",
  };

  const { handleChange, handleSubmit, values, errors } = useFormValidation(
    INITIAL_STATE
  );

  return (
    <Container className="pageContainer">
      <Grid container direction="column">
        <Form
          onSubmit={async (e) => {
            try {
              if (editFlag) {
                await handleSubmit(e, updateProductAction, toggleModal);
              } else {
                await handleSubmit(e, addProductAction, toggleModal);
              }
            } catch (error) {}
          }}
        >
          <Grid item xs={6}>
            <InputGroup className="mb-3">
              <FormControl
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </InputGroup>
          </Grid>
          <Grid item xs={6}>
            <InputGroup className="mb-3">
              <FormControl
                name="price"
                type="text"
                value={values.price}
                onChange={handleChange}
                placeholder="Product Price"
              />
            </InputGroup>
          </Grid>

          <Grid item xs={6}>
            <InputGroup className="mb-3">
              <FormControl
                name="color"
                type="text"
                value={values.color}
                onChange={handleChange}
                placeholder="Product Colour"
              />
            </InputGroup>
          </Grid>

          <Grid item xs={6}>
            <InputGroup className="mb-3">
              <Form.Control
                as="select"
                name="vitamin"
                value={values.vitamin}
                onChange={handleChange}
                placeholder="Vitamin"
                defaultValue={values.vitamin ? values.vitamin : ""}
              >
                <option value="">Choose Vitamin</option>
                {productTypes.vitamins.map((item) => {
                  return <option value={item._id}>{item.Name}</option>;
                })}
              </Form.Control>
            </InputGroup>
          </Grid>

          <Grid direction="row">
            <Row>
              <Col xs={3}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Grid>
        </Form>
      </Grid>
    </Container>
  );
};

export default AddProduct;
