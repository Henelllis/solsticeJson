import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCustomers,
  getCustomers,
  getAccounts,
  selectAccounts,
} from "./tableStateSlice";
import {
  Button,
  CircularProgress,
  Paper,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SolsticeHeader from "../../components/SolsticeTable/Header";
import SolsticeToolbar from "../../components/SolsticeTable/ToolBar";
import SolsticeTableBody from "../../components/SolsticeTable/Body";

import { Customer, Account } from "solstice-common";
const useStyles = makeStyles({
  paper: {
    width: "100%",
  },
  button: {
    backgroundColor: "coral",
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  },
});

export interface HeadCell {
  disablePadding: boolean;
  id: keyof any;
  label: string;
  numeric: boolean;
}
export interface HeadCustomerCell extends HeadCell {
  id: keyof Customer;
}

export interface HeadAccountCell extends HeadCell {
  id: keyof Account;
}

const headAccountCells: HeadAccountCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "Account id" },
  {
    id: "customer_id",
    numeric: true,
    disablePadding: false,
    label: "Customer id",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  { id: "city", numeric: false, disablePadding: false, label: "City" },
  { id: "zip_code", numeric: false, disablePadding: false, label: "Zip Code" },
  {
    id: "solar_farm_id",
    numeric: true,
    disablePadding: false,
    label: "Solar Farm Id",
  },
  {
    id: "capacity_share",
    numeric: true,
    disablePadding: false,
    label: "Capacity Share",
  },
  {
    id: "created_date",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
];

const headCustomerCells: HeadCustomerCell[] = [
  { id: "id", numeric: false, disablePadding: false, label: "Customer id" },
  {
    id: "first_name",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "active", numeric: false, disablePadding: false, label: "Is Active" },
  {
    id: "account_manager_id",
    numeric: true,
    disablePadding: false,
    label: "Account Manager",
  },
  {
    id: "reason_for_joining",
    numeric: true,
    disablePadding: false,
    label: "Reason For Joining",
  },
  {
    id: "created_date",
    numeric: false,
    disablePadding: false,
    label: "CreatedDate",
  },
];

export type Order = "asc" | "desc";

export function AccountTable() {
  const customers = useSelector(selectCustomers);
  const accounts = useSelector(selectAccounts);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>("asc");
  const [tabletype, setTabletype] = React.useState<"customer" | "account">(
    "account"
  );

  const [orderByCustomer, setOrderByCustomer] = React.useState<keyof Customer>(
    "id"
  );
  const [orderByAccount, setOrderByAccount] = React.useState<keyof Account>(
    "id"
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleCustomerRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Customer
  ) => {
    const isAsc = orderByCustomer === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderByCustomer(property);
  };

  const handleAccountRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Account
  ) => {
    const isAsc = orderByAccount === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderByAccount(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAccounts());
  }, []);

  if (!customers || !accounts) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Button
          className={classes.button}
          onClick={() => {
            tabletype === "customer"
              ? setTabletype("account")
              : setTabletype("customer");
          }}
        >{`Switch to ${
          tabletype === "customer" ? "Accounts" : "Customers"
        } Table`}</Button>
        <Paper className={classes.paper}>
          <TableContainer style={{ width: 1200 }}>
            <SolsticeToolbar
              title={tabletype === "customer" ? "Customers" : "Accounts"}
            />
            <SolsticeHeader
              order={order}
              orderByCustomer={orderByCustomer}
              orderByAccount={orderByAccount}
              onCustomerRequestSort={handleCustomerRequestSort}
              onAccountRequestSort={handleAccountRequestSort}
              headAccountCells={headAccountCells}
              headCustomerCells={headCustomerCells}
              tabletype={tabletype}
            />
            <SolsticeTableBody
              order={order}
              orderBy={
                tabletype === "customer" ? orderByCustomer : orderByAccount
              }
              page={page}
              rows={tabletype === "customer" ? customers : accounts}
              rowsPerPage={rowsPerPage}
              tabletype={tabletype}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={customers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </>
    );
  }
}
