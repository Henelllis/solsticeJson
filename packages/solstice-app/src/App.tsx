import React from "react";
import { AccountTable } from "./features/tableState/AccountTable";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  rootApp: {
    background: "yellow",
    minHeight: "100vh",
    width: "100vw",
  },
  tableGridContainer: {
    paddingTop: "5em",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Grid container className={classes.rootApp}>
      <Grid item xs={12}>
        <Grid container className={classes.tableGridContainer} justify="center">
          <Grid item>
            <AccountTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
