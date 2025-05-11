import React, { useState } from "react";
import { useTransactions } from "../contexts/transactionsContext";
import { useAuth } from "../contexts/authContext";
import { TransactionType } from "../interfaces/interfaces";

type Props = {
    onClose: () => void;
};

const AddTransactionForm = ({ onClose }: Props) => {
    const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.INCOME);
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>("");

    const { createTransactions } = useTransactions();
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        const transactionDate = new Date(date);
        await createTransactions(transactionType, amount, transactionDate);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#A64DFF] bg-opacity-40">
            <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg relative">
                <h2 className="text-2xl mb-4 font-semibold text-center">Add New Transaction</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Transaction Type</label>
                        <select
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value={TransactionType.INCOME}>Income</option>
                            <option value={TransactionType.EXPENSE}>Expense</option>
                            <option value={TransactionType.TRANSFER}>Transfer</option>
                        </select>

                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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

export default AddTransactionForm;