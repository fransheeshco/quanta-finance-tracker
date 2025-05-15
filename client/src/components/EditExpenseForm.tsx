import React, { useState } from "react";
import { Expenses } from "@/interfaces/interfaces";
import { useExpenses } from "@/contexts/expenseContext";

interface EditExpenseFormProps {
  expense: Expenses;
  onClose: () => void;
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ expense, onClose }) => {
  const { updateExpense } = useExpenses();

  const [title, setTitle] = useState<string>(expense.title);
  const [amount, setAmount] = useState<number>(expense.amount);
  const [date, setDate] = useState<string>(
    new Date(expense.date).toISOString().split("T")[0]
  );  
  const [categoryName, setCategoryName] = useState<string>(expense.categoryName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExpense(title, amount, expense.expenseID, new Date(date), categoryName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-[500px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">Edit Expense</h2>

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
          Category Name
          <input
            type="text"
            className="border px-3 py-2 rounded-xl"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpenseForm;
