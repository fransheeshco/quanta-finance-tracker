import React, { useEffect, useState, useMemo } from "react";
import { useExpenses } from "../contexts/expenseContext";
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import EditExpenseForm from "../components/EditExpenseForm";
import { useCategory } from "../contexts/categoryContext";

const ExpensesPage = () => {
  const {
    expenses,
    expenseCount,
    fetchExpenses,
    deleteExpense,
  } = useExpenses();
  const { categories } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filterType, setFilterType] = useState<"all" | "fixed" | "variable">("all");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editExpenseID, setEditExpenseID] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses({
      page: currentPage,
      limit: pageSize,
      categoryID: categoryFilter === "all" ? undefined : categoryFilter,
    });
  }, [currentPage, pageSize, filterType, categoryFilter, fetchExpenses]);

  // Reset page to 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, categoryFilter, searchTerm]);

  const handleDelete = (expenseID: number) => {
    if (window.confirm("Are you sure you want to delete this Expenses?")) {
      deleteExpense(expenseID);
    }
    
  };

  const handleEdit = (expenseID: number) => {
    setEditExpenseID(expenseID);
    setIsEditOpen(true);
  };

  const handleSortByAmount = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const totalPages = Math.ceil(expenseCount / pageSize);
  const currentData = useMemo(() => {
    let data = expenses ?? [];

    if (categoryFilter !== "all") {
      data = data.filter((e) => e.categoryID === categoryFilter);
    }

    if (searchTerm.trim() !== "") {
      data = data.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by amount based on the order
    if (sortOrder === "asc") {
      data = data.sort((a, b) => a.amount - b.amount);
    } else {
      data = data.sort((a, b) => b.amount - a.amount);
    }

    return data;
  }, [expenses, categoryFilter, searchTerm, sortOrder]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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

          {/* Filters */}
          <div className="flex gap-4 items-center">
            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value === "all" ? "all" : parseInt(e.target.value)
                )
              }
              className="border border-[#A64DFF] px-3 py-1 rounded-2xl text-[#A64DFF]"
            >
              <option value="all">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-auto px-4 py-1 border border-[#A64DFF] rounded-2xl text-sm w-60"
            />
          </div>

          {/* Add Expense Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddExpenseForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Edit Expense Modal */}
          {isEditOpen && editExpenseID !== null && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <EditExpenseForm
                key={editExpenseID}
                expense={expenses?.find((e) => e.expenseID === editExpenseID)!}
                onClose={() => setIsEditOpen(false)}
              />
            </div>
          )}

          {/* Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {currentData.length === 0 ? (
              <p className="p-4 text-center text-gray-600">No expenses found.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F4E1FF]">
                  <tr>
                    <th className="py-3 px-6">Title</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6 cursor-pointer" onClick={handleSortByAmount}>
                      Amount {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((expense) => (
                    <tr key={expense.expenseID} className="border-t">
                      <td className="py-3 px-6">{expense.title ?? "N/A"}</td>
                      <td>{expense.Category?.categoryName || "Uncategorized"}</td>
                      <td className="py-3 px-6">₱{expense.amount.toFixed(2)}</td>
                      <td className="py-3 px-6">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleEdit(expense.expenseID)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense.expenseID)}
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


          {/* Pagination */}
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

export default ExpensesPage;
