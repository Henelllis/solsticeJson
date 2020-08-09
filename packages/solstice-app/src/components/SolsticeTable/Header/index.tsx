import React from "react";
import {
  TableCell,
  TableHead,
  TableSortLabel,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Account, Customer } from "solstice-common";
import {
  Order,
  HeadAccountCell,
  HeadCustomerCell,
} from "../../../features/tableState/AccountTable";
const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

interface SolsticeHeaderProps {
  onCustomerRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Customer
  ) => void;
  onAccountRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Account
  ) => void;
  order: Order;
  orderByCustomer: string;
  orderByAccount: string;

  headCustomerCells: HeadCustomerCell[];
  headAccountCells: HeadAccountCell[];
  tabletype: "account" | "customer";
}

function SolsticeTableHeader(props: SolsticeHeaderProps) {
  const classes = useStyles();
  const {
    headAccountCells,
    headCustomerCells,
    onAccountRequestSort,
    onCustomerRequestSort,
    order,
    orderByAccount,
    orderByCustomer,
    tabletype,
  } = props;

  const createCustomerSortHandler = (property: keyof Customer) => (
    event: React.MouseEvent<unknown>
  ) => {
    onCustomerRequestSort(event, property);
  };

  const createAccountSortHandler = (property: keyof Account) => (
    event: React.MouseEvent<unknown>
  ) => {
    onAccountRequestSort(event, property);
  };

  if (tabletype === "customer") {
    return (
      <TableHead>
        <TableRow>
          {headCustomerCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderByCustomer === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderByCustomer === headCell.id}
                direction={orderByCustomer === headCell.id ? order : "asc"}
                onClick={createCustomerSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderByCustomer === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <TableHead>
        <TableRow>
          {headAccountCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderByAccount === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderByAccount === headCell.id}
                direction={orderByAccount === headCell.id ? order : "asc"}
                onClick={createAccountSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderByAccount === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default SolsticeTableHeader;
