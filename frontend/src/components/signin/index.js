import React from "react";
import { connect, useDispatch } from "react-redux";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Fingerprint, Person } from "@material-ui/icons";

import useFormValidation from "../../validators/useFormValidation";
import validateAuth from "../../validators/validateAuth";
import { authAction } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "../../styles/components/signin.css";

const INITIAL_STATE = {
  Username: "",
  Password: "",
};

const Signin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateAuth
  );
  const { authAction } = props;

  return (
    <>
      <div className="signIn">
        <div className="signInContainer">
          <div className="signInForm">
            <div className="signInuserIcon">
              <Person className="headiconbg" />
            </div>
            <p>Sign In</p>

            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await authAction(values);
                  navigate("/admin/home");
                } catch (error) {}
              }}
            >
              {
                <div>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Person />
                    </InputGroup.Text>
                    <FormControl
                      name="Username"
                      type="text"
                      value={values.Username}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Fingerprint />
                    </InputGroup.Text>
                    <FormControl
                      name="Password"
                      type="password"
                      value={values.Password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
              }

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  authAction,
};
export default connect(null, mapDispatchToProps)(Signin);
