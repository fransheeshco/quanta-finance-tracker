import { useEffect, useState, useCallback } from "react";
import { Income } from "../interfaces/interfaces";
import { useIncome } from "../contexts/incomeContext";
import AddIncomeForm from "../components/AddIncome";
import EditIncomeForm from "../components/EditIncomeForm";

type Props = {};

const IncomePage = (_props: Props) => {
  const { incomes, fetchIncome, deleteIncome, incomeCount } = useIncome();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [sortField, setSortField] = useState<string>("amount");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const fetchData = useCallback(
    (page: number, sortField: string, sortOrder: "asc" | "desc") => {
      fetchIncome({ page, sortField, sortBy: sortOrder, limit: pageSize });
    },
    [fetchIncome, pageSize]
  );

  useEffect(() => {
    fetchData(currentPage, sortField, sortOrder);
  }, [currentPage, sortField, sortOrder, fetchData]);

  const handleDelete = (incomeID: number) => {
    if (window.confirm("Are you sure you want to delete this Income?")) {
      deleteIncome(incomeID);
    }
    
  };

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setIsEditFormOpen(true);
  };

  const handleSave = async (_incomeID: number, _amount: number) => {
    // Here you would typically call an `updateIncome` function from context
    // e.g., await updateIncome(incomeID, amount);
    await fetchData(currentPage, sortField, sortOrder); // Refresh income list
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to the first page on sort
  };

  const totalPages = Math.ceil(incomeCount / pageSize);
  const currentData = incomes ?? [];

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

  if (!incomes) return <div>Loading...</div>;

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Income History</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddIncomeForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {isEditFormOpen && selectedIncome && (
            <EditIncomeForm
              income={selectedIncome}
              onClose={() => setIsEditFormOpen(false)}
              onSave={handleSave}
            />
          )}

          {/* Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {incomes?.length === 0 ? (
              <p>No incomes found.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F4E1FF]">
                  <tr>
                    <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort("amount")}>
                      Amount {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((income, index) => (
                    <tr key={income.incomeID || index} className="border-t">
                      <td className="py-3 px-6">₱{(income.amount ?? 0).toFixed(2)}</td>
                      <td className="py-3 px-6">{new Date(income.date).toLocaleDateString()}</td>
                      <td className="py-3 px-6 flex gap-2">
                        <button
                          onClick={() => handleEdit(income)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(income.incomeID)}
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

export default IncomePage;