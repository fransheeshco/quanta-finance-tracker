import React, { useState } from "react";
import { useSavings } from "../contexts/savingsContext";
import { useAuth } from "../contexts/authContext";

type Props = {
  onClose: () => void;
};

const AddSavingsForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  const { createSavings } = useSavings();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    await createSavings(title, goalAmount, currentAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-[#A64DFF] bg-opacity-40 items-center">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Add New Savings</h2>

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
            <label className="block text-sm font-semibold mb-1">Goal Amount</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Current Amount</label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSavingsForm;
