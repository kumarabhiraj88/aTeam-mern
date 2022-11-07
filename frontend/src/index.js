import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import mystore from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/components/index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  zindex: 10000;
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <ToastContainer />
      <App />
      <div className="loader">
        <ClipLoader css={override} size={50} color={"#ffc107"} loading={true} />
      </div>
    </Provider>
  </React.StrictMode>
);
