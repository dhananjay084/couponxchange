"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores, deleteStore } from "../../../api/storeApi";
import { Toaster } from "react-hot-toast";
import StoreForm from "../../../components/StoreForm";

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores = [], status, error } = useSelector((state) => state.stores);
  const [editingStore, setEditingStore] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);



  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center">All Stores</h2>

      <div className="overflow-x-auto shadow bg-white mb-10 rounded-lg">
        <table className="min-w-full border text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="border p-3">Logo</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Show on Home</th>
              <th className="border p-3">Popular</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store._id} className="hover:bg-blue-50">
                <td className="border p-3">
                  <img src={store.storeLogo} alt={store.storeName} className="w-12 h-12 object-contain" />
                </td>
                <td className="border p-3">{store.storeName}</td>
                <td className="border p-3">{store.showOnHomePage}</td>
                <td className="border p-3">{store.popularStore}</td>
                <td className="border p-3 text-center">
                  <button
                    className="text-blue-600 mr-3"
                    onClick={() => setEditingStore(store)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => dispatch(deleteStore(store._id)).then(() => dispatch(fetchStores()))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StoreForm editingStore={editingStore} setEditingStore={setEditingStore} />
    </div>
  );
};

export default StoreList;
