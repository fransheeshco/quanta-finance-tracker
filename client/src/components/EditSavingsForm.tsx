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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled correctly
    if (!title || goalAmount <= 0 || currentAmount < 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    try {
      // Call the updateSavings function to update the saving entry
      await updateSavings(saving.savingID, title, goalAmount, currentAmount);
      toast.success("Savings updated successfully.");
      onClose(); // Close the form after successful update
    } catch (error) {
      toast.error("Error updating savings.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Edit Savings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold mb-1">Savings Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Savings Title"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Goal Amount Input */}
          <div>
            <label className="block text-sm font-semibold mb-1">Goal Amount</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              placeholder="Enter Goal Amount"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Current Amount Input */}
          <div>
            <label className="block text-sm font-semibold mb-1">Current Amount</label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              placeholder="Enter Current Amount"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
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
              Update Savings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSavingsForm;
