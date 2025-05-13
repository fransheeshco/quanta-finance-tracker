import React, { useState } from "react";
import { useCategory } from "@/contexts/categoryContext";
import { useExpenses } from "@/contexts/expenseContext";
import { useNavigate } from "react-router-dom";

interface ExpensesFormProps {
  onClose: () => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = ({ onClose }) => {
  const { categories } = useCategory();
  const { createExpense } = useExpenses();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [categoryID, setCategoryID] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryID === "" || categoryID === 0) {
      return alert("Please select a valid category.");
    }
    await createExpense(title, amount, new Date(date), categoryID as number);
    onClose();
  };

  const handleAddCategoryRedirect = () => {
    onClose();
    navigate("/categories"); // assuming your route for category form/page
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-[500px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">Add Expense</h2>

        <label className="flex flex-col gap-1">
          Title
          <input
            type="text"
            className="border px-3 py-2 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Amount (₱)
          <input
            type="number"
            className="border px-3 py-2 rounded-xl"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Date
          <input
            type="date"
            className="border px-3 py-2 rounded-xl"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Category
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(Number(e.target.value))}
            className="border px-3 py-2 rounded-xl"
            required
          >
            <option value="" disabled>Select category</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))
            ) : (
              <option value="" disabled>No categories available</option>
            )}
          </select>
          <button
            type="button"
            onClick={handleAddCategoryRedirect}
            className="text-sm mt-1 underline text-[#A64DFF]"
          >
            + Add New Category
          </button>
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#A64DFF] text-white px-6 py-2 rounded-xl"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpensesForm;
