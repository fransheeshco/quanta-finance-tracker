import React, { useState } from "react";
import { useTransactions } from "../contexts/transactionsContext";
import { toast } from "react-toastify";
import { Transactions, TransactionType } from "../interfaces/interfaces";

type EditTransactionsFormProps = {
  transaction: Transactions;
  onClose: () => void;
};

const EditTransactionsForm = ({ transaction, onClose }: EditTransactionsFormProps) => {
  const { updateTransactions } = useTransactions();
  const [transactionType, setTransactionType] = useState<TransactionType>(transaction.transactionType);
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [date, setDate] = useState<string>(
    typeof transaction.date === "string"
      ? transaction.date
      : new Date(transaction.date).toISOString().split("T")[0]
  );
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionType || amount === 0 || !date) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    await updateTransactions(transaction.transactionID, transactionType, amount, new Date(date));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-2xl mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* If transactionType is a select dropdown (like 'income' | 'expense'), use <select> instead of input */}
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as TransactionType)}
            className="w-full p-2 border rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionsForm;