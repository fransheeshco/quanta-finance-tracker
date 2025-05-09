import React, { useEffect, useState } from "react";
import { useTransactions } from "../contexts/transactionsContext";
import { useExpenses } from "@/contexts/expenseContext";
import AddTransactionForm from "../components/AddTransactionForm"; // Import the form you want to use

type Props = {};

const TransactionsPage = (props: Props) => {
  const { transactions, fetchTransactions, deleteTransactions } = useTransactions();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = (transactionID: number) => {
    deleteTransactions(transactionID);
  };

  const totalPages = Math.ceil((transactions?.length ?? 0) / pageSize);
  const currentData = transactions?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Transaction History</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Add Transaction Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddTransactionForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Summary / Filters */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {transactions?.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((transaction) => (
                    <tr key={transaction.transactionID} className="border-t">
                      <td className="py-2">{transaction.transactionType}</td>
                      <td className="py-2">₱{transaction.amount.toFixed(2)}</td>
                      <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDelete(transaction.transactionID)}
                          className="bg-red-500 text-white px-4 py-1 rounded-2xl"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center w-full px-2">
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex gap-4">
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Prev
              </button>
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handleNextPage}
                disabled={currentPage + 1 >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsPage;
