import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
// import axios from "axios";
import { Customer, Account } from "solstice-common";

interface CounterState {
  value: number;
  loading: boolean;
  customers: Customer[] | null;
  accounts: Account[] | null;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  customers: [],
  accounts: [],
};

export const tableSlice = createSlice({
  name: "tableState",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = !state.loading;
    },
    populateCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    populateAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const {
  loading,
  populateAccounts,
  populateCustomers,
} = tableSlice.actions;

const apiGateway = "https://v2u3eaqpc2.execute-api.us-east-1.amazonaws.com/dev";
export const getAccounts = (): AppThunk => async (dispatch) => {
  dispatch(loading());

  const accounts = await fetch(`${apiGateway}/accounts`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  dispatch(populateAccounts((await accounts.json()) as Account[]));
  dispatch(loading());
};

export const getCustomers = (): AppThunk => async (dispatch) => {
  dispatch(loading());

  const customers = await fetch(`${apiGateway}/customers`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  dispatch(populateCustomers((await customers.json()) as Customer[]));
  dispatch(loading());
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAccounts = (state: RootState) => state.tableState.accounts;
export const selectCustomers = (state: RootState) => state.tableState.customers;

export default tableSlice.reducer;
