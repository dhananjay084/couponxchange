"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStore, updateStore, fetchStores } from "../api/storeApi";
import toast from "react-hot-toast";

const StoreForm = ({ editingStore, setEditingStore }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    storeLogo: "",
    storeName: "",
    showOnHomePage: "no",
    popularStore: "no",
  });

  useEffect(() => {
    if (editingStore) {
      setForm({
        storeLogo: editingStore.storeLogo,
        storeName: editingStore.storeName,
        showOnHomePage: editingStore.showOnHomePage,
        popularStore: editingStore.popularStore,
      });
    } else {
      setForm({
        storeLogo: "",
        storeName: "",
        showOnHomePage: "no",
        popularStore: "no",
      });
    }
  }, [editingStore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStore) {
        await dispatch(updateStore({ id: editingStore._id, storeData: form }));
        toast.success("Store updated successfully");
      } else {
        await dispatch(addStore(form));
        toast.success("Store added successfully");
      }

      setForm({ storeLogo: "", storeName: "", showOnHomePage: "no", popularStore: "no" });
      setEditingStore(null);
      dispatch(fetchStores());
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">
        {editingStore ? "Edit Store" : "Add New Store"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Store Logo URL</label>
          <input
            type="text"
            name="storeLogo"
            value={form.storeLogo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={form.storeName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Show on Home Page</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="showOnHomePage"
                value="yes"
                checked={form.showOnHomePage === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="showOnHomePage"
                value="no"
                checked={form.showOnHomePage === "no"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1">Popular Store</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="popularStore"
                value="yes"
                checked={form.popularStore === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="popularStore"
                value="no"
                checked={form.popularStore === "no"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editingStore ? "Update Store" : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
