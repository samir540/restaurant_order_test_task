import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/api";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const fetchData = createAsyncThunk("order/fetchData", async () => {
  return api
    .get("/data")
    .then((response) => response.data);
});
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {state.loading = true});
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
