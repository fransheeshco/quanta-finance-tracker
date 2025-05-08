import React, { useState } from "react";
import { Categories } from "@/interfaces/interfaces"; // Adjust based on your actual Category type
import { useCategory } from "@/contexts/categoryContext"; // Replace with the correct path to your category context

type Props = {
  category: Categories;
  onClose: () => void;
  onSave: (categoryName: string, categoryID: number) => Promise<void>;
};

const EditCategoryForm = ({ category, onClose }: Props) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const { editCategory } = useCategory(); // Assuming your context has a function to update categories

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName) return alert("Please enter a valid category name.");
    await editCategory(categoryName, category.categoryID); // Update category info
    onClose(); // Close the form after the update
  };


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Edit Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#A64DFF] text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
