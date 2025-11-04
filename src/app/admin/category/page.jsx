"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../../api/categoryApi";
import { Toaster } from "react-hot-toast";
import CategoryForm from "../../../components/CategoryForm";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories = [], status, error } = useSelector((state) => state.categories);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center">All Categories</h2>

      <div className="overflow-x-auto shadow bg-white mb-10 rounded-lg">
        {categories.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No categories available. Add one below 👇
          </p>
        ) : (
          <table className="min-w-full border text-sm">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Show on Home</th>
                <th className="border p-3">Popular</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-blue-50">
                  <td className="border p-3">
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      className="w-12 h-12 object-contain"
                    />
                  </td>
                  <td className="border p-3">{category.categoryName}</td>
                  <td className="border p-3">{category.showOnHomePage}</td>
                  <td className="border p-3">{category.popularCategory}</td>
                  <td className="border p-3 text-center">
                    <button
                      className="text-blue-600 mr-3"
                      onClick={() => setEditingCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() =>
                        dispatch(deleteCategory(category._id)).then(() =>
                          dispatch(fetchCategories())
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CategoryForm editingCategory={editingCategory} setEditingCategory={setEditingCategory} />
    </div>
  );
};

export default CategoryList;
