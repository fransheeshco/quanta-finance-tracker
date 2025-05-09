import React, { useState } from "react";
import { Income } from "../interfaces/interfaces";
import { useIncome } from "../contexts/incomeContext";

interface EditIncomeFormProps {
  income: Income;
  onClose: () => void;
  onSave: (incomeID: number, amount: number) => void;
}

const EditIncomeForm: React.FC<EditIncomeFormProps> = ({
  income,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState(income.amount || 0);
  const { updateIncome } = useIncome();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!income.incomeID) return;

    await updateIncome(income.incomeID, amount);
    onSave(income.incomeID, amount); // Optional: to sync or refetch
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#A64DFF] bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Income</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount (₱)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border px-3 py-2 rounded-md"
            required
            min={0}
            step={0.01}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIncomeForm;
