import React, { useState } from "react";
import { useCategory } from "../contexts/categoryContext";
import { useExpenses } from "../contexts/expenseContext";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};

const ExpensesForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [categoryID, setCategoryID] = useState<number | "">("");
  const { categories } = useCategory();
  const { createExpense } = useExpenses();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryID) return alert("Please select a category.");
    await createExpense( title, amount, new Date(date), categoryID);
    onClose();
  };

  const handleAddCategoryRedirect = () => {
    onClose();
    navigate("/categories"); // assuming your route for category form/page
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Add Expense</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              value={categoryID}
              onChange={(e) => setCategoryID(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select category</option>
              {categories?.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddCategoryRedirect}
              className="text-sm mt-1 underline text-[#A64DFF]"
            >
              + Add New Category
            </button>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpensesForm;
