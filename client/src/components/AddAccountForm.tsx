import React, { useState } from "react";
import { useAccounts } from "../contexts/accountContext";
import { useAuth } from "../contexts/authContext";

type Props = {
  onClose: () => void;
};

const AddAccountForm = ({ onClose }: Props) => {
  const [balance, setBalance] = useState<number>(0);
  const [accountType, setAccountType] = useState<string>("");
  const { createAccount } = useAccounts();
  const { user, token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) return;


    await createAccount(accountType, balance, user.userID);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Add New Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Account Type</label>
            <input
              type="text"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Balance</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : 0; // Sets 0 if input is empty
                setBalance(value);
              }}
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

export default AddAccountForm;
