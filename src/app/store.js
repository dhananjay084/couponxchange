import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "../features/deal/dealSlice";
import storeReducer from "../features/store/storeSlice"
import categoryReducer from "../features/category/categorySlice";
import blogReducer from '../features/blog/blogSlice';
export const store = configureStore({
  reducer: {
    deals: dealReducer,
    stores: storeReducer, 
    categories: categoryReducer, 
    blogs: blogReducer,


  },
});
