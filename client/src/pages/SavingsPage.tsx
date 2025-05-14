import React, { useEffect, useState } from "react";
import { Savings } from "../interfaces/interfaces";
import { useSavings } from "../contexts/savingsContext";
import AddSavingsForm from "../components/AddSavingsForm";
import EditSavingsForm from "../components/EditSavingsForm";

type Props = {};

const SavingsPage = (_props: Props) => {
  const { savings, fetchSavings, deleteSavings, setCurrentPage, currentPage, totalPages } = useSavings();
  const [pageSize, _setPageSize] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState<Savings | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("goalAmountAsc");

  useEffect(() => {
    const filters: {
      page: number;
      limit?: number;
      sortField?: string;
      sortBy?: "asc" | "desc"; 
    } = {
      page: currentPage, 
      limit: pageSize,
      sortField: sortOption.replace('Asc', '').replace('Desc', ''),
      sortBy: sortOption.endsWith('Asc') ? 'asc' : 'desc',
    };
    fetchSavings(filters);
  }, [currentPage, pageSize, sortOption, fetchSavings]);
  

  const handleDelete = (savingID: number) => {
    deleteSavings(savingID);
  };

  const handleEdit = (saving: Savings) => {
    setEditingSaving(saving);
    setIsEditFormOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter savings based on search query
  const filteredSavings = (savings ?? []).filter((saving) =>
    saving.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  let currentData = filteredSavings;
  if (sortOption === "goalAmountAsc") {
    currentData = currentData.sort((a, b) => a.goalAmount - b.goalAmount);
  } else if (sortOption === "goalAmountDesc") {
    currentData = currentData.sort((a, b) => b.goalAmount - a.goalAmount);
  } else if (sortOption === "currentAmountAsc") {
    currentData = currentData.sort((a, b) => a.currentAmount - b.currentAmount);
  } else if (sortOption === "currentAmountDesc") {
    currentData = currentData.sort((a, b) => b.currentAmount - a.currentAmount);
  }

  // Paginate the data based on the current page
  console.log(totalPages)
  console.log(currentPage)
  console.log(currentPage + 1)

  const handlePrevPage = () => {
    if (currentPage > 0) {
      console.log("blahblah " ,currentPage - 1)
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage + 1));
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  console.log("SavingsPage - Current Page:", currentPage, "Total Pages:", totalPages);

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#4A00B3]">Savings History</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-3xl text-white font-medium text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Add/Edit Savings Forms */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
              <AddSavingsForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}
          {isEditFormOpen && editingSaving && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
              <EditSavingsForm saving={editingSaving} onClose={() => setIsEditFormOpen(false)} />
            </div>
          )}

          {/* Search Bar */}
          <div className="mt-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border border-[#A64DFF] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#A64DFF]"
            />
            {/* Sorting Dropdown */}
            <label htmlFor="sort" className="text-lg font-semibold text-[#4A00B3]">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-[#A64DFF] rounded-lg text-[#4A00B3] shadow-md focus:outline-none focus:ring-2 focus:ring-[#A64DFF]"
            >
              <option value="goalAmountAsc">Goal Amount (Ascending)</option>
              <option value="goalAmountDesc">Goal Amount (Descending)</option>
              <option value="currentAmountAsc">Current Amount (Ascending)</option>
              <option value="currentAmountDesc">Current Amount (Descending)</option>
            </select>
          </div>

          {/* Savings Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {filteredSavings.length === 0 ? (
              <p className="p-4 text-center text-gray-600">No savings found.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F4E1FF]">
                  <tr>
                    <th className="py-3 px-6">Title</th>
                    <th className="py-3 px-6">Goal Amount</th>
                    <th className="py-3 px-6">Current Amount</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((saving) => (
                    <tr key={saving.savingID} className="border-t">
                      <td className="py-2 px-6">{saving.title}</td>
                      <td className="py-2 px-6">₱{saving.goalAmount.toFixed(2)}</td>
                      <td className="py-2 px-6">₱{saving.currentAmount.toFixed(2)}</td>
                      <td className="py-2 px-6 flex gap-3">
                        <button
                          onClick={() => handleEdit(saving)}
                          className="bg-blue-500 text-white py-1 px-4 rounded-xl shadow-md hover:bg-[#6D00D7] transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(saving.savingID)}
                          className="bg-[#FF4C4C] text-white py-1 px-4 rounded-xl shadow-md hover:bg-[#FF0000] transition"
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
          <div className="flex justify-between items-center mt-6 px-2">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-4">
              <button
                className="text-white px-5 py-2 rounded-3xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Prev
              </button>
              <button
                className="text-white px-5 py-2 rounded-3xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={handleNextPage}
                disabled={currentPage + 1 > totalPages}
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

export default SavingsPage;