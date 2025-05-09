import React, { useEffect, useState } from "react";
import { Savings } from "../interfaces/interfaces";
import { useSavings } from "../contexts/savingsContext";
import AddSavingsForm from "../components/AddSavingsForm";
import EditSavingsForm from "../components/EditSavingsForm"; // Import the EditSavingsForm

type Props = {};

const SavingsPage = (props: Props) => {
  const { savings, fetchSavings, deleteSavings } = useSavings();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState<Savings | null>(null); // State to track which saving is being edited

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  const handleDelete = (savingID: number) => {
    deleteSavings(savingID);
  };

  const handleEdit = (saving: Savings) => {
    setEditingSaving(saving);
    setIsEditFormOpen(true); // Open the edit form
  };

  const totalPages = Math.ceil((savings?.length ?? 0) / pageSize);
  const currentData = savings?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];

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
            <h1 className="text-4xl">Savings History</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Add Savings Form */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <AddSavingsForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Edit Savings Form */}
          {isEditFormOpen && editingSaving && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <EditSavingsForm
                saving={editingSaving}
                onClose={() => setIsEditFormOpen(false)} // Close the form
              />
            </div>
          )}

          {/* Summary / Filters */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {savings?.length === 0 ? (
              <p>No savings found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Savings ID</th>
                    <th className="py-2">Title</th>
                    <th className="py-2">Goal Amount</th>
                    <th className="py-2">Current Amount</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((saving) => (
                    <tr key={saving.savingID} className="border-t">
                      <td className="py-2">{saving.savingID}</td>
                      <td className="py-2">{saving.title}</td>
                      <td className="py-2">₱{saving.goalAmount.toFixed(2)}</td>
                      <td className="py-2">₱{saving.currentAmount.toFixed(2)}</td>
                      <td className="py-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(saving)} // Open the edit form with the selected saving
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(saving.savingID)}
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

export default SavingsPage;
