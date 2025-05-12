import React, { useEffect, useState } from "react";
import { useTransactions } from "../contexts/transactionsContext";
import { useNavigate } from "react-router-dom";
import AddTransactionForm from "../components/AddTransactionForm";
import EditTransactionsForm from "../components/EditTrasactionForm";

type Props = {};

const TransactionsPage = (props: Props) => {
  const {
    transactions,
    transactionCount,
    fetchTransactions,
    deleteTransactions,
  } = useTransactions();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTransactionID, setEditTransactionID] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  useEffect(() => {
    const filters: any = {
      page: currentPage,
      limit: pageSize,
    };

    if (filterType !== "all") {
      filters.transactionType = filterType;
    }

    fetchTransactions(filters);
  }, [currentPage, pageSize, filterType, fetchTransactions]);

  const handleDelete = (transactionID: number) => {
    deleteTransactions(transactionID);
  };

  const handleEdit = (transactionID: number) => {
    setEditTransactionID(transactionID);
    setIsEditOpen(true);
  };

  const handleSortByAmount = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const totalPages = Math.ceil(transactionCount / pageSize);
  const sortedData = [...(transactions ?? [])].sort((a, b) =>
    sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
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

          {/* Filter Buttons */}
          <div className="flex gap-4">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setCurrentPage(1);
                  setFilterType(type as "all" | "income" | "expense");
                }}
                className={`px-4 py-1 rounded-2xl border ${
                  filterType === type
                    ? "bg-[#A64DFF] text-white"
                    : "text-[#A64DFF] border-[#A64DFF]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Add Transaction Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddTransactionForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Edit Transaction Modal */}
          {isEditOpen && editTransactionID !== null && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <EditTransactionsForm
                transaction={transactions?.find(
                  (t) => t.transactionID === editTransactionID
                )!}
                onClose={() => setIsEditOpen(false)}
              />
            </div>
          )}

          {/* Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {transactions?.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F4E1FF]">
                  <tr>
                    <th className="py-3 px-6">Type</th>
                    <th
                      className="py-3 px-6 cursor-pointer select-none"
                      onClick={handleSortByAmount}
                    >
                      Amount {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((transaction) => (
                    <tr key={transaction.transactionID} className="border-t">
                      <td className="py-3 px-6">{transaction.transactionType}</td>
                      <td className="py-3 px-6">₱{transaction.amount.toFixed(2)}</td>
                      <td className="py-3 px-6">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleEdit(transaction.transactionID)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl mr-2"
                        >
                          Edit
                        </button>
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
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-4">
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
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
