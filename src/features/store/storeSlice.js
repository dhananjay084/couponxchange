// src/features/store/storeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchStores, addStore, updateStore, deleteStore } from "../../api/storeApi";

const storeSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.unshift(action.payload);
      })

      // Update
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(
          (store) => store._id === action.payload._id
        );
        if (index !== -1) state.stores[index] = action.payload;
      })

      // Delete
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(
          (store) => store._id !== action.payload
        );
      });
  },
});

export default storeSlice.reducer;
