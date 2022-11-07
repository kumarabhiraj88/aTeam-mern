import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "../../styles/components/sidebar.css";
import { logoutAction } from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await logoutAction();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userid");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">ATeam</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">USER</p>
          <li onClick={logout}>
            <PersonOutlineOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
