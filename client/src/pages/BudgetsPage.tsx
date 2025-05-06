  import React, { useEffect, useMemo, useState } from "react";
  import { useAuth } from "../contexts/authContext";
  import { useBudgets } from "../contexts/budgetsContext";
  import AddBudgetForm from "../components/AddBudgetForm";

  // Adjust this type according to your actual data model
  type Budget = {
    budgetID: number;
    budgetName: string;
    amount: number;
    startDate: string;
    endDate: string;
  };

  const BudgetPage = () => {
    const { user, token } = useAuth();
    const { budgets, fetchBudgets } = useBudgets();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
      if (user && token) {
        fetchBudgets();
      }
    }, [user, token]);

    const columns: { key: keyof Budget; label: string }[] = useMemo(
      () => [
        { key: "budgetName", label: "Budget Name" },
        { key: "amount", label: "Amount" },
        { key: "startDate", label: "Start Date" },
        { key: "endDate", label: "End Date" },
      ],
      []
    );

    const paginatedData = useMemo(() => {
      const start = currentPage * pageSize;
      const end = start + pageSize;
      return budgets?.slice(start, end) ?? [];
    }, [budgets, currentPage]);

    const totalPages = budgets ? Math.ceil(budgets.length / pageSize) : 0;

    if (!budgets) return null;

    return (
      <section className="absolute top-45 left-25 z-0">
        <div className="mt-4 flex justify-center">
          <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <h1 className="text-4xl">Budgets</h1>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
              >
                + ADD NEW
              </button>
              {isFormOpen && <AddBudgetForm onClose={() => setIsFormOpen(false)} />}
            </div>

            {/* Summary / Filters Section */}
            <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
              Summary / Filters
            </div>

            {/* Data Table */}
            <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
              {budgets.length === 0 ? (
                <p>No budgets found.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} className="py-2">{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((budget) => (
                      <tr key={budget.budgetID} className="border-t">
                        {columns.map((column) => {
                          const value = budget[column.key];
                          return (
                            <td key={column.key} className="py-2">
                              {column.key === "amount"
                                ? `₱${value}`
                                : value instanceof Date
                                  ? value.toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                  : value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center w-full px-2">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              <div className="flex gap-4">
                <button
                  className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
                >
                  Prev
                </button>
                <button
                  className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={currentPage >= totalPages - 1}
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
