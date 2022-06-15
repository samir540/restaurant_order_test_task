import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/api";

const initialState = {
  oderedTableAndServer: [],
  loading: false,
  error: "",
};

export const fetchTableAndServerData = createAsyncThunk(
  "serverAndTable/fetchTableAndServerData",
  async () => {
    return api.get("/oderedTableAndServer").then((response) => response.data);
  }
);
const tableAndServerSlice = createSlice({
  name: "serverAndTable",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTableAndServerData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTableAndServerData.fulfilled, (state, action) => {
      state.oderedTableAndServer = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchTableAndServerData.rejected, (state, action) => {
      state.oderedTableAndServer = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default tableAndServerSlice.reducer;
