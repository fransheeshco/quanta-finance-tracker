import React, { useEffect, useState, useMemo } from "react";
import { useBudgets } from "../contexts/budgetsContext";
import { useCategory } from "../contexts/categoryContext";
import { useNavigate } from "react-router-dom";
import AddBudgetForm from "../components/AddBudgetForm";
import EditBudgetForm from "../components/EditbudgetsForm";

const BudgetPage = () => {
  const {
    budgets: rawBudgets,
    fetchBudgets,
    addBudget,
    removeBudget,
    editBudget,
  } = useBudgets();

  const budgets = rawBudgets ?? [];

  const { categories } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBudgetID, setEditBudgetID] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBudgets(currentPage, "amount", sortOrder);
  }, [currentPage, pageSize, sortOrder, fetchBudgets]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = (budgetID: number) => {
    removeBudget(budgetID);
  };

  const handleEdit = (budgetID: number) => {
    setEditBudgetID(budgetID);
    setIsEditOpen(true);
  };

  const handleSortByAmount = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const totalPages = Math.ceil(budgets.length / pageSize);
  const currentData = useMemo(() => {
    let data = budgets ?? [];

    if (searchTerm.trim() !== "") {
      data = data.filter((b) =>
        b.budgetName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      data = data.sort((a, b) => a.amount - b.amount);
    } else {
      data = data.sort((a, b) => b.amount - a.amount);
    }

    return data;
  }, [budgets, searchTerm, sortOrder]);

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
            <h1 className="text-4xl">Budgets</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-auto px-4 py-1 border border-[#A64DFF] rounded-2xl text-sm w-60"
          />

          {/* Add Budget Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddBudgetForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Edit Budget Modal */}
          {isEditOpen && editBudgetID !== null && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <EditBudgetForm
                budget={budgets?.find((b) => b.budgetID === editBudgetID)!}
                onClose={() => setIsEditOpen(false)}
              />
            </div>
          )}

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {currentData.length === 0 ? (
              <p>No budgets found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2 cursor-pointer" onClick={handleSortByAmount}>
                      Amount {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th className="py-2">Start Date</th>
                    <th className="py-2">End Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((budget) => (
                    <tr key={budget.budgetID} className="border-t">
                      <td className="py-2">{budget.budgetName}</td>
                      <td className="py-2">₱{budget.amount.toFixed(2)}</td>
                      <td>{new Date(budget.startDate).toLocaleDateString()}</td>
                      <td>{new Date(budget.endDate).toLocaleDateString()}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleEdit(budget.budgetID)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(budget.budgetID)}
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

export default BudgetPage;
