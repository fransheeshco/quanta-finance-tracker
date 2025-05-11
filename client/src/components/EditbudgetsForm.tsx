import React, { useState } from "react";
import { useBudgets } from "../contexts/budgetsContext";
import { Budget } from "../interfaces/interfaces";

interface EditBudgetFormProps {
  budget: Budget;
  onClose: () => void;
}

const EditBudgetForm: React.FC<EditBudgetFormProps> = ({ budget, onClose }) => {
  const { editBudget } = useBudgets();

  const [name, setName] = useState(budget.budgetName);
  const [budgetAmount, setBudgetAmount] = useState(budget.amount);
  const [start, setStart] = useState(budget.startDate.slice(0, 10)); // Ensure it's formatted for input[type="date"]
  const [end, setEnd] = useState(budget.endDate.slice(0, 10));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editBudget(
      budget.budgetID,
      name,
      budgetAmount,
      new Date(start),
      new Date(end)
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-[500px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">Edit Budget</h2>

        <label className="flex flex-col gap-1">
          Budget Name
          <input
            type="text"
            className="border px-3 py-2 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Amount (₱)
          <input
            type="number"
            className="border px-3 py-2 rounded-xl"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(Number(e.target.value))}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Start Date
          <input
            type="date"
            className="border px-3 py-2 rounded-xl"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          End Date
          <input
            type="date"
            className="border px-3 py-2 rounded-xl"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
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

export default EditBudgetForm;
