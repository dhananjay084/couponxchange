import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as dealApi from "../../api/dealApi";
import { showSuccess, showError } from "../../utils/toastConfig";

export const fetchDeals = createAsyncThunk("deals/fetchAll", async () => {
  return await dealApi.getDeals();
});

export const addDeal = createAsyncThunk("deals/addDeal", async (dealData) => {
  return await dealApi.createDeal(dealData);
});

export const updateDealById = createAsyncThunk("deals/updateDeal", async ({ id, dealData }) => {
  return await dealApi.updateDeal(id, dealData);
});

export const deleteDealById = createAsyncThunk("deals/deleteDeal", async (id) => {
  return await dealApi.deleteDeal(id);
});

const dealSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        showError("Failed to fetch deals");
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.deals.push(action.payload);
        showSuccess("Deal created successfully");
      })
      .addCase(updateDealById.fulfilled, (state, action) => {
        const index = state.deals.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.deals[index] = action.payload;
        showSuccess("Deal updated successfully");
      })
      .addCase(deleteDealById.fulfilled, (state, action) => {
        state.deals = state.deals.filter((d) => d._id !== action.meta.arg);
        showSuccess("Deal deleted successfully");
      });
  },
});

export default dealSlice.reducer;
