import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs, fetchBlog, createBlog, updateBlog, deleteBlog } from "../../api/blogApi";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    currentBlog: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload.data || action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch single blog
      .addCase(fetchBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBlog = action.payload.data || action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog && state.currentBlog._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      });
  },
});

export const { clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;