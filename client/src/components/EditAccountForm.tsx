import React, { useState } from "react";
import { Account } from "@/interfaces/interfaces";
import { useAccounts } from "@/contexts/accountContext";

type Props = {
  account: Account;
  onClose: () => void;
  onSave: (accountID: number, balance: number, accountType: string) => Promise<void>; // Add onSave here
};

const EditAccountForm = ({ account, onClose, onSave }: Props) => {
  const [balance, setBalance] = useState(account.balance);
  const [accountType, setAccountType] = useState(account.accountType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return alert("Please enter a valid account type.");
    await onSave(account.accountID, balance, accountType); // Call onSave instead of updateAccount
    onClose(); // Close after the save completes
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <h2 className="text-2xl mb-4 font-semibold text-center">Edit Account</h2>
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
              onChange={(e) => setBalance(Number(e.target.value))}
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

export default EditAccountForm;
