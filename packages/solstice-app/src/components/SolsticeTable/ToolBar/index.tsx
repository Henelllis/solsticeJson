import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Customer } from "solstice-common";

const useStyles = makeStyles({
  title: {
    flex: "1 1 100%",
  },
});

interface HeadCell {
  disablePadding: boolean;
  id: keyof Customer;
  label: string;
  numeric: boolean;
}

interface SolsticeHeaderProps {
  title: string;
}

function SolsticeTableToolbar(props: SolsticeHeaderProps) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
    </Toolbar>
  );
}

export default SolsticeTableToolbar;
