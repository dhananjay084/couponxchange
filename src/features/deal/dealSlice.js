import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as dealApi from "../../api/dealApi";
import { uploadDealsExcel } from "../../api/uploadApi"; // ✅ import the upload API
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

// ✅ NEW: Bulk Upload Thunk
export const bulkUploadDeals = createAsyncThunk("deals/bulkUpload", async (file, { rejectWithValue }) => {
  try {
    const res = await uploadDealsExcel(file);
    return res;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Bulk upload failed");
  }
});

const dealSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    status: "idle",
    error: null,
    uploadStatus: "idle", // ✅ NEW: bulk upload status
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Deals
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

      // Add Deal
      .addCase(addDeal.fulfilled, (state, action) => {
        state.deals.push(action.payload);
        showSuccess("Deal created successfully");
      })

      // Update Deal
      .addCase(updateDealById.fulfilled, (state, action) => {
        const index = state.deals.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.deals[index] = action.payload;
        showSuccess("Deal updated successfully");
      })

      // Delete Deal
      .addCase(deleteDealById.fulfilled, (state, action) => {
        state.deals = state.deals.filter((d) => d._id !== action.meta.arg);
        showSuccess("Deal deleted successfully");
      })

      // ✅ Bulk Upload
      .addCase(bulkUploadDeals.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(bulkUploadDeals.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.deals.push(...action.payload.data); // add uploaded deals to list
        showSuccess(action.payload.message || "Bulk upload successful!");
      })
      .addCase(bulkUploadDeals.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload || "Bulk upload failed";
        showError(state.error);
      });
  },
});

export default dealSlice.reducer;
