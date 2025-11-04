import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addDeal, updateDealById, fetchDeals } from "../features/deal/dealSlice";
import { fetchStores } from "../api/storeApi"; // ✅ make sure you have this thunk
import { fetchCategories } from "../api/categoryApi"; // ✅ or wherever your category slice is
import { toast } from "react-hot-toast";

const DealForm = ({ editingDeal, setEditingDeal }) => {
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  // ✅ Fetch stores and categories when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storeRes = await dispatch(fetchStores()).unwrap();
        setStores(storeRes || []);
        const catRes = await dispatch(fetchCategories()).unwrap();
        setCategories(catRes || []);
      } catch (err) {
        toast.error("Failed to load stores or categories");
        console.error("Error loading data:", err);
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (editingDeal) {
      toast("Editing mode: " + editingDeal.dealTitle, { icon: "✏️" });
    }
  }, [editingDeal]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        dealTitle: editingDeal?.dealTitle || "",
        dealImage: editingDeal?.dealImage || "",
        dealLogo: editingDeal?.dealLogo || "",
        dealTag: editingDeal?.dealTag || "",
        dealStore: editingDeal?.dealStore || "", // store _id here
        dealDescription: editingDeal?.dealDescription || "",
        dealCategory: editingDeal?.dealCategory || "", // category _id here
        dealCode: editingDeal?.dealCode || "",
        redirectLink: editingDeal?.redirectLink || "",
        expirationDate: editingDeal?.expirationDate?.slice(0, 10) || "",
        dealSection: editingDeal?.dealSection || "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (editingDeal) {
            await dispatch(
              updateDealById({ id: editingDeal._id, dealData: values })
            ).unwrap();
            toast.success("Deal updated successfully!");
            setEditingDeal(null);
          } else {
            await dispatch(addDeal(values)).unwrap();
            toast.success("Deal created successfully!");
          }
          resetForm();
          dispatch(fetchDeals());
        } catch (err) {
          toast.error("Failed to save deal!");
          console.error(err);
        }
      }}
    >
      {() => (
        <Form className="flex flex-col gap-2 w-96 mx-auto p-4 border rounded-lg bg-white shadow">
          <h3 className="text-lg font-semibold mb-2 text-center">
            {editingDeal ? "Edit Deal" : "Add New Deal"}
          </h3>

          <Field name="dealTitle" placeholder="Deal Title" className="border p-2" />
          <Field name="dealImage" placeholder="Deal Image URL" className="border p-2" />
          <Field name="dealLogo" placeholder="Deal Logo URL" className="border p-2" />
          <Field name="dealTag" placeholder="Deal Tag" className="border p-2" />

          {/* ✅ Store dropdown */}
          <Field as="select" name="dealStore" className="border p-2">
            <option value="">Select Store</option>
            {stores.map((store) => (
              <option key={store._id} value={store.storeName || store.name}>
                {store.storeName || store.name}
              </option>
            ))}
          </Field>

          <Field name="dealDescription" placeholder="Description" className="border p-2" />

          {/* ✅ Category dropdown */}
          <Field as="select" name="dealCategory" className="border p-2">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.categoryName || cat.name}>
                {cat.categoryName || cat.name}
              </option>
            ))}
          </Field>

          <Field name="dealCode" placeholder="Deal Code" className="border p-2" />
          <Field name="redirectLink" placeholder="Redirect Link" className="border p-2" />
          <Field name="expirationDate" type="date" className="border p-2" />

          {/* Section Dropdown */}
          <Field as="select" name="dealSection" className="border p-2">
            <option value="">Select Section</option>
            <option value="1st Section">1st Section</option>
            <option value="2nd Section">2nd Section</option>
            <option value="3rd Section">3rd Section</option>
            <option value="4th Section">4th Section</option>
          </Field>

          <button
            type="submit"
            className={`py-2 rounded text-white ${
              editingDeal ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editingDeal ? "Update Deal" : "Add Deal"}
          </button>

          {editingDeal && (
            <button
              type="button"
              onClick={() => setEditingDeal(null)}
              className="py-2 rounded text-gray-700 border mt-2 hover:bg-gray-100"
            >
              Cancel Edit
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DealForm;
