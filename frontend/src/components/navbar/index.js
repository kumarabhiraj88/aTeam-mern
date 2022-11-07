import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "../../styles/components/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div
        //className="search"
        >
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          <div className="item">
            <NotificationsOutlinedIcon className="icon" />
            <div className="counter" />
          </div>
          {/* <div className="item">
            <img src="" alt="Avatar" className="avatar" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
