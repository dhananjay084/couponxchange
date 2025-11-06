"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadDeals, fetchDeals } from "../features/deal/dealSlice";
import { toast } from "react-hot-toast";

const BulkDealUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { uploadStatus } = useSelector((state) => state.deals);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    try {
      await dispatch(bulkUploadDeals(file)).unwrap();
      setFile(null);
      dispatch(fetchDeals());
    } catch (error) {
      console.error("Bulk upload error:", error);
    }
  };

  return (
    <div className="w-96 mx-auto bg-white shadow p-4 rounded-lg mt-6 text-center">
      <h3 className="text-lg font-semibold mb-2">📦 Bulk Upload Deals</h3>
      <input
        type="file"
        accept=".xls,.xlsx,.csv"
        onChange={handleFileChange}
        className="border p-2 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploadStatus === "loading"}
        className={`mt-3 py-2 px-4 w-full rounded text-white ${
          uploadStatus === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {uploadStatus === "loading" ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default BulkDealUpload;
