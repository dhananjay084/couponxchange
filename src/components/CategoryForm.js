"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory, fetchCategories } from "../api/categoryApi";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

const CategoryForm = ({ editingCategory, setEditingCategory }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const initialValues = editingCategory || {
    categoryName: "",
    categoryImage: "",
    showOnHomePage: "No",
    popularCategory: "No",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (editingCategory) {
      await dispatch(updateCategory({ id: editingCategory._id, data: values }));
      setEditingCategory(null);
    } else {
      await dispatch(addCategory(values));
    }
    resetForm();
    dispatch(fetchCategories());
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">
        {editingCategory ? "Edit Category" : "Add Category"}
      </h3>

      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Category Name</label>
              <Field name="categoryName" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-medium">Category Image URL</label>
              <Field name="categoryImage" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-medium mb-1">Show on Home Page</label>
              <div className="flex gap-4">
                <label>
                  <Field type="radio" name="showOnHomePage" value="Yes" /> Yes
                </label>
                <label>
                  <Field type="radio" name="showOnHomePage" value="No" /> No
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Popular Category</label>
              <div className="flex gap-4">
                <label>
                  <Field type="radio" name="popularCategory" value="Yes" /> Yes
                </label>
                <label>
                  <Field type="radio" name="popularCategory" value="No" /> No
                </label>
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingCategory ? "Update Category" : "Add Category"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;
