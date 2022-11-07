import React from "react";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import * as productTypes from "../../redux/types/productTypes.js";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  fullname: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

const ProductColumns = (props) => {
  const classes = useStyles();
  const { rows, page, rowsPerPage, editFunc } = props;

  return (
    <>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow key={row._id} onClick={() => editFunc(row._id)}>
            <TableCell component="th" scope="row">
              <Typography className={classes.fullname}>{row.name}</Typography>
            </TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.color}</TableCell>
            <TableCell>
              {productTypes.vitamins.map((item) => {
                if (item._id === row.vitamin) {
                  return item.Name;
                } else {
                  return null;
                }
              })}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default ProductColumns;
