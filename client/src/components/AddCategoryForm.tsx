import React, { useState } from "react";
import { useCategory } from "../contexts/categoryContext";

type Props = {
  onClose: () => void;
};

const AddCategoryForm = ({ onClose }: Props) => {
  const { addCategory } = useCategory();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCategoryName = categoryName.trim();
    if (!trimmedCategoryName) return;

    // Optional: Prevent special characters or numbers
    const isValid = /^[A-Za-z\s]+$/.test(trimmedCategoryName);
    if (!isValid) {
      alert("Category name must only contain letters and spaces.");
      return;
    }

    try {
      setIsLoading(true);
      await addCategory(trimmedCategoryName);
      setCategoryName("");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white w-[400px] rounded-2xl p-6 border border-[#A64DFF] shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A64DFF]"
            required
            disabled={isLoading}
            aria-label="Category Name"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-[#A64DFF] text-white hover:bg-[#922ee6] disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
