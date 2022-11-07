import React from "react";
import ProductColumnHead from "./productTableColumnsHead.js";
import ProductColumns from "./productTableColumns.js";
import { TableBody, TableHead } from "@material-ui/core";

const ProductTableRecords = (props) => {
  const { rows, page, rowsPerPage, editFunc } = props;
  return (
    <>
      <TableHead>
        <ProductColumnHead />
      </TableHead>
      <TableBody>
        <ProductColumns
          editFunc={editFunc}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </TableBody>
    </>
  );
};

export default ProductTableRecords;
