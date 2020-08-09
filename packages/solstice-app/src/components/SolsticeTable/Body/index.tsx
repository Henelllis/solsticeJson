import React from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Customer, Account } from "solstice-common";
import { Order } from "../../../features/tableState/AccountTable";

const useStyles = makeStyles({
  title: {
    flex: "1 1 100%",
  },
});

interface SolsticeBodyProps {
  order: Order;
  orderBy: keyof Customer | keyof Account;
  page: number;
  rowsPerPage: number;
  rows: Customer[] | Account[];
  tabletype: "customer" | "account";
}

function SolsticeTableBody(props: SolsticeBodyProps) {
  const classes = useStyles();
  const { order, orderBy, page, rowsPerPage, rows, tabletype } = props;

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean | null },
    b: { [key in Key]: number | string | boolean | null }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  let sortedRows: any[] = [];
  if (tabletype === "customer") {
    sortedRows = stableSort<Customer>(
      rows as Customer[],
      getComparator(order, orderBy as keyof Customer)
    );
  } else {
    sortedRows = stableSort<Account>(
      rows as Account[],
      getComparator(order, orderBy as keyof Account)
    );
  }

  return (
    <TableBody>
      {sortedRows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          let renderRow: any;
          if (tabletype === "customer") {
            renderRow = (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.first_name}</TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{`${row.active}`}</TableCell>
                <TableCell align="right">{row.account_manager_id}</TableCell>
                <TableCell align="right">{row.reason_for_joining}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
              </TableRow>
            );
          } else {
            renderRow = (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.customer_id}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.zip_code}</TableCell>
                <TableCell align="right">{row.solar_farm_id}</TableCell>
                <TableCell align="right">{row.capacity_share}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
              </TableRow>
            );
          }

          return renderRow;
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default SolsticeTableBody;
