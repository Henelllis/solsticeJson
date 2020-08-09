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

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    loading: (state) => {
      state.loading = !state.loading;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
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
  increment,
  decrement,
  incrementByAmount,
  loading,
  populateAccounts,
  populateCustomers,
} = counterSlice.actions;

const apiGateway = "https://v2u3eaqpc2.execute-api.us-east-1.amazonaws.com/dev";
export const getAccounts = (): AppThunk => async (dispatch) => {
  dispatch(loading());
  // const customers = await axios.get(`${apiGateway}/customers`, {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // });

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
  // const customers = await axios.get(`${apiGateway}/customers`, {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // });

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

export default counterSlice.reducer;
