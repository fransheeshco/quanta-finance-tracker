import React, { useEffect, useState } from "react";
import { useExpenses } from "../contexts/expenseContext";
import { useAuth } from "../contexts/authContext";
import ExpensesForm from "../components/AddExpenseForm";
import EditExpenseForm from "../components/EditExpenseForm";
import { Expenses } from "../interfaces/interfaces";

type Props = {};

const ExpensesPage = (props: Props) => {
  const { user, token } = useAuth();
  const { expenses, fetchExpenses, deleteExpenses, updateExpense } = useExpenses();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expenses | null>(null);
  const [expensesUpdated, setExpensesUpdated] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (user && token && !hasFetched) {
      fetchExpenses();
      setHasFetched(true);
    }
  }, [user, token, hasFetched, fetchExpenses]);

  const totalPages = Math.ceil((expenses?.length ?? 0) / pageSize);
  const currentData =
    expenses?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleEditExpense = (expense: Expenses) => {
    setSelectedExpense(expense); // Pass the entire expense object
    setIsEditFormOpen(true); // Open the edit form modal
  };

  const handleDeleteExpense = async (expenseID: number) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpenses(expenseID);
      fetchExpenses();
    }
  };

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Expenses</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Modal Forms */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <ExpensesForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}
          {isEditFormOpen && selectedExpense && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <EditExpenseForm
                expense={selectedExpense}
                onClose={() => setIsEditFormOpen(false)}
              />
            </div>
          )}

          {/* Summary / Filters */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {expenses?.length === 0 ? (
              <p>No expenses found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Title</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((exp) => (
                    <tr key={exp.expenseID} className="border-t">
                      <td className="py-2">{exp.title}</td>
                      <td className="py-2">{exp.amount}</td>
                      <td className="py-2">{new Date(exp.date).toLocaleDateString()}</td>
                      <td className="py-2">{exp.categoryID}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleEditExpense(exp)} // Pass the entire expense object
                          className="bg-[#A64DFF] px-4 py-2 text-white rounded-2xl mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(exp.expenseID)}
                          className="bg-[#A64DFF] px-4 py-2 text-white rounded-2xl"
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

export default ExpensesPage;
