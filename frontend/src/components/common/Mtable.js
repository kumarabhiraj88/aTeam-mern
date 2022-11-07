import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  Paper,
  TablePagination,
} from "@material-ui/core";
import ProductTableRecords from "../datatable/productTableRecords";
import * as productTypes from "../../redux/types/productTypes";
import SearchBar from "material-ui-search-bar";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    marginTop: "10px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

function MTable(props) {
  const classes = useStyles();

  const {
    tableData,
    contentFlag,
    editFunc,
    deleteFunc,
    exportFlag,
    detailedPage,
    filePopupPage,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchStatus, setSearchStatus] = useState("no");
  const [rows, setRows] = useState(tableData);

  useEffect(() => {
    setRows(tableData);
  }, [JSON.stringify(tableData)]);

  const [searched, setSearched] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal, flag) => {
    if (searchedVal != "") {
      setSearchStatus("yes");
    } else {
      setSearchStatus("no");
    }

    const filteredRows = tableData.filter((row) => {
      if (flag === "PRODUCTS") {
        return (
          row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.price.toString().includes(searchedVal) ||
          row.color.includes(searchedVal)
        );
      }
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  function TableRecords(props) {
    switch (props.flag) {
      case "PRODUCTS":
        return (
          <ProductTableRecords
            editFunc={props.editFunc}
            rows={props.rows}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
          />
        );

      default:
        return null;
    }
  }

  return (
    <>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal, contentFlag)}
        onCancelSearch={() => cancelSearch()}
        className={exportFlag == "yes" && "searchBar"}
      />

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label="simple table"
          id="mytable-to-xls"
        >
          <TableRecords
            detailedPage={detailedPage}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
            flag={contentFlag}
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          {/* <TableFooter >
            </TableFooter> */}
        </Table>
      </TableContainer>
      <TablePagination
        xs={12}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default MTable;
