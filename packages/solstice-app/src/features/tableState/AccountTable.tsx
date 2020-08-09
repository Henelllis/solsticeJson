import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  // incrementByAmount,
  // incrementAsync,
  // getCustomers,
  selectAccounts,
  getAccounts,
} from "./tableStateSlice";
import styles from "./Table.module.css";

export function AccountTable() {
  const accounts = useSelector(selectAccounts);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  if (!accounts) {
    return null;
  } else {
    const renderAccounts = accounts.map((account) => {
      return <p> {`${account.id} : ${account.city}`} </p>;
    });

    return <div>{renderAccounts}</div>;
  }
}
