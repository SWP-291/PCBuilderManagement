import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "auth",
  initialState: {
    pcs: {
      pc: null,
      isFetching: false,
      error: false,
    },
    components: {
      component: null,
      isFetching: false,
      error: false,
    },
    catergories: {
      catergory: null,
      isFetching: false,
      error: false,
    },
    users: {
      user: null,
      isFetching: false,
      error: false,
    },
    brands: {
      brand: null,
      isFetching: false,
      error: false,
    },
    orders: {
      order: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    getAllPcStart: (state) => {
      state.pcs.isFetching = true;
    },
    getAllPcSuccess: (state, action) => {
      state.pcs.isFetching = false;
      state.pcs.pc = action.payload;
      state.pcs.error = false;
    },
    getAllPcFailed: (state) => {
      state.pcs.isFetching = false;
      state.pcs.error = true;
    },
    getAllComponentsStart: (state) => {
      state.components.isFetching = true;
    },
    getAllComponentsSuccess: (state, action) => {
      state.components.isFetching = false;
      state.components.component = action.payload;
      state.components.error = false;
    },
    getAllComponentsFailed: (state) => {
      state.components.isFetching = false;
      state.components.error = true;
    },
    getAllCatergoryStart: (state) => {
      state.catergories.isFetching = true;
    },
    getAllCatergorySuccess: (state, action) => {
      state.catergories.isFetching = false;
      state.catergories.catergory = action.payload;
      state.catergories.error = false;
    },
    getAllCatergoryFailed: (state) => {
      state.catergories.isFetching = false;
      state.catergories.error = true;
    },
    getAllUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.user = action.payload;
      state.users.error = false;
    },
    getAllUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    getAllBrandStart: (state) => {
      state.brands.isFetching = true;
    },
    getAllBrandSuccess: (state, action) => {
      state.brands.isFetching = false;
      state.brands.brand = action.payload;
      state.brands.error = false;
    },
    getAllBrandFailed: (state) => {
      state.brands.isFetching = false;
      state.brands.error = true;
    },
    getAllOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    getAllOrderSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.order = action.payload;
      state.orders.error = false;
    },
    getAllOrderFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },
  },
});

export const {
  getAllPcStart,
  getAllPcSuccess,
  getAllPcFailed,
  getAllComponentsStart,
  getAllComponentsSuccess,
  getAllComponentsFailed,
  getAllCatergoryStart,
  getAllCatergorySuccess,
  getAllCatergoryFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  getAllBrandStart,
  getAllBrandSuccess,
  getAllBrandFailed,
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailed,
} = adminSlice.actions;
export default adminSlice.reducer;
