import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/api";

const initialState = {
  meals: [],
  loading: false,
  error: "",
};

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  return api.get("/oderedMeals").then((response) => response.data);
});

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMeals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchMeals.rejected, (state, action) => {
      state.meals = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default mealsSlice.reducer;
