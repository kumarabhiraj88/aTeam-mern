import React from "react";
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import Product from "../product/index.js";
import "../../styles/components/home.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <Product />
      </div>
    </div>
  );
};

export default Home;
