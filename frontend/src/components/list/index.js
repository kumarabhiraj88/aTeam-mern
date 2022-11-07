import React from "react";
import Sidebar from "../sidebar/index.js";
import Datatable from "../datatable/index.js";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
};

export default List;
