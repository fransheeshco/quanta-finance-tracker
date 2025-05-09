import React, { useState } from "react";
import { useSavings } from "../contexts/savingsContext";
import { toast } from "react-toastify";
import { Savings } from "../interfaces/interfaces";

type EditSavingsFormProps = {
  saving: Savings;
  onClose: () => void;
};

const EditSavingsForm = ({ saving, onClose }: EditSavingsFormProps) => {
  const { updateSavings } = useSavings();
  const [title, setTitle] = useState(saving.title);
  const [goalAmount, setGoalAmount] = useState(saving.goalAmount);
  const [currentAmount, setCurrentAmount] = useState(saving.currentAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || goalAmount <= 0 || currentAmount < 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    await updateSavings(title, goalAmount, currentAmount, saving.savingID);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-2xl mb-4">Edit Savings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Savings Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            placeholder="Goal Amount"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(Number(e.target.value))}
            placeholder="Current Amount"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Savings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSavingsForm;
