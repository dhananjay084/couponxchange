"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getDeals } from "@/api/dealApi";
import { getHomepageConfig, saveHomepageConfig } from "@/api/homepageApi";

const initialState = {
  sliderDealIds: [],
  sections: {
    section1: { title: "", description: "" },
    section2: { title: "", description: "" },
    section3: { title: "", description: "" },
    section4: { title: "", description: "" },
    popularStores: { title: "", description: "" },
  },
  midBanner: {
    imageUrl: "",
    redirectUrl: "",
  },
  categoryPageBanner: {
    imageUrl: "",
    redirectUrl: "",
  },
  faqSection: {
    title: "FAQs",
    items: [{ question: "", answer: "" }],
  },
};

export default function AdminHomepagePage() {
  const [formData, setFormData] = useState(initialState);
  const [allDeals, setAllDeals] = useState([]);
  const [dealSearch, setDealSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dealsRes, homepageRes] = await Promise.all([getDeals(), getHomepageConfig()]);
        setAllDeals(Array.isArray(dealsRes) ? dealsRes : []);
        if (homepageRes?.data) {
          setFormData({
            ...initialState,
            ...homepageRes.data,
            faqSection: {
              title: homepageRes.data?.faqSection?.title || "FAQs",
              items:
                homepageRes.data?.faqSection?.items?.length > 0
                  ? homepageRes.data.faqSection.items
                  : [{ question: "", answer: "" }],
            },
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load homepage config");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredDeals = useMemo(() => {
    const query = dealSearch.trim().toLowerCase();
    if (!query) return allDeals;
    return allDeals.filter(
      (deal) =>
        String(deal?.dealTitle || "")
          .toLowerCase()
          .includes(query) ||
        String(deal?.dealStore || "")
          .toLowerCase()
          .includes(query)
    );
  }, [allDeals, dealSearch]);

  const selectedDeals = useMemo(() => {
    const selectedIds = new Set(formData.sliderDealIds.map(String));
    return allDeals.filter((deal) => selectedIds.has(String(deal._id)));
  }, [allDeals, formData.sliderDealIds]);

  const updateSection = (sectionKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          [field]: value,
        },
      },
    }));
  };

  const toggleSliderDeal = (dealId) => {
    setFormData((prev) => {
      const exists = prev.sliderDealIds.some((id) => String(id) === String(dealId));
      return {
        ...prev,
        sliderDealIds: exists
          ? prev.sliderDealIds.filter((id) => String(id) !== String(dealId))
          : [...prev.sliderDealIds, dealId],
      };
    });
  };

  const updateFaq = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqSection: {
        ...prev.faqSection,
        items: prev.faqSection.items.map((faq, faqIndex) =>
          faqIndex === index ? { ...faq, [field]: value } : faq
        ),
      },
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqSection: {
        ...prev.faqSection,
        items: [...prev.faqSection.items, { question: "", answer: "" }],
      },
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqSection: {
        ...prev.faqSection,
        items:
          prev.faqSection.items.length > 1
            ? prev.faqSection.items.filter((_, faqIndex) => faqIndex !== index)
            : [{ question: "", answer: "" }],
      },
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await saveHomepageConfig(formData);
      toast.success("Homepage info saved");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save homepage info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading homepage settings...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Homepage Info</h2>

      <form onSubmit={onSubmit} className="max-w-6xl mx-auto space-y-8">
        <section className="bg-white rounded-lg shadow p-5">
          <h3 className="text-xl font-semibold mb-3">Home Page Slider (Select Deals)</h3>
          <input
            value={dealSearch}
            onChange={(e) => setDealSearch(e.target.value)}
            placeholder="Search deals by title/store"
            className="w-full border rounded p-2 mb-3"
          />

          {selectedDeals.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedDeals.map((deal) => (
                <span key={deal._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {deal.dealTitle}
                </span>
              ))}
            </div>
          ) : null}

          <div className="max-h-64 overflow-y-auto border rounded p-3 space-y-2">
            {filteredDeals.map((deal) => {
              const checked = formData.sliderDealIds.some((id) => String(id) === String(deal._id));
              return (
                <label key={deal._id} className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSliderDeal(deal._id)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-medium">{deal.dealTitle}</span>
                    <span className="text-gray-500"> ({deal.dealStore})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {["section1", "section2", "section3", "section4", "popularStores"].map((key) => (
          <section key={key} className="bg-white rounded-lg shadow p-5">
            <h3 className="text-xl font-semibold mb-3 capitalize">
              {key === "popularStores" ? "Popular Store Section" : `${key} Info`}
            </h3>
            <input
              value={formData.sections[key].title}
              onChange={(e) => updateSection(key, "title", e.target.value)}
              placeholder="Heading"
              className="w-full border rounded p-2 mb-2"
            />
            <textarea
              value={formData.sections[key].description}
              onChange={(e) => updateSection(key, "description", e.target.value)}
              placeholder="Description"
              className="w-full border rounded p-2 min-h-[90px]"
            />
          </section>
        ))}

        <section className="bg-white rounded-lg shadow p-5">
          <h3 className="text-xl font-semibold mb-3">Middle Banner</h3>
          <input
            value={formData.midBanner.imageUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                midBanner: { ...prev.midBanner, imageUrl: e.target.value },
              }))
            }
            placeholder="Banner Image URL"
            className="w-full border rounded p-2 mb-2"
          />
          <input
            value={formData.midBanner.redirectUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                midBanner: { ...prev.midBanner, redirectUrl: e.target.value },
              }))
            }
            placeholder="Banner Redirect URL"
            className="w-full border rounded p-2"
          />
        </section>

        <section className="bg-white rounded-lg shadow p-5">
          <h3 className="text-xl font-semibold mb-3">Category Page Banner</h3>
          <input
            value={formData.categoryPageBanner.imageUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categoryPageBanner: {
                  ...prev.categoryPageBanner,
                  imageUrl: e.target.value,
                },
              }))
            }
            placeholder="Category Banner Image URL"
            className="w-full border rounded p-2 mb-2"
          />
          <input
            value={formData.categoryPageBanner.redirectUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categoryPageBanner: {
                  ...prev.categoryPageBanner,
                  redirectUrl: e.target.value,
                },
              }))
            }
            placeholder="Category Banner Redirect Route/URL"
            className="w-full border rounded p-2"
          />
        </section>

        <section className="bg-white rounded-lg shadow p-5">
          <h3 className="text-xl font-semibold mb-3">FAQs Section</h3>
          <input
            value={formData.faqSection.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                faqSection: { ...prev.faqSection, title: e.target.value },
              }))
            }
            placeholder="FAQ Section Heading"
            className="w-full border rounded p-2 mb-3"
          />

          <div className="space-y-3">
            {formData.faqSection.items.map((faq, index) => (
              <div key={index} className="border rounded p-3">
                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder={`FAQ ${index + 1} Question`}
                  className="w-full border rounded p-2 mb-2"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder={`FAQ ${index + 1} Answer`}
                  className="w-full border rounded p-2 min-h-[80px]"
                />
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove FAQ
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addFaq}
            className="mt-3 border border-blue-600 text-blue-600 px-3 py-1 rounded"
          >
            Add FAQ
          </button>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Homepage Info"}
          </button>
        </div>
      </form>
    </div>
  );
}
