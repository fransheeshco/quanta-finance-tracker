import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useCategory } from "../contexts/categoryContext";
import AddCategoryForm from "../components/AddCategoryForm";
import EditCategoryForm from "../components/EditCategoriesForm"; // Import the new EditCategoryForm

type Props = {};

const CategoryPage = (props: Props) => {
  const { user, token } = useAuth();
  const { categories, fetchCategories, editCategory, removeCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State for edit form
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // Store the selected category to edit
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (user && token && !hasFetched) {
      fetchCategories();
      setHasFetched(true); // Ensures fetch happens only once
    }
  }, [user, token, hasFetched, fetchCategories]);

  const totalPages = Math.ceil((categories?.length ?? 0) / pageSize);
  const currentData =
    categories?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];

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

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category); // Set the category to edit
    setIsEditFormOpen(true); // Open the edit form
  };

  const handleDeleteCategory = async (categoryID: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await removeCategory(categoryID); // Call the deleteCategory function from the context
      fetchCategories(); // Re-fetch categories after deletion
    }
  };

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Categories</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <AddCategoryForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {isEditFormOpen && selectedCategory && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <EditCategoryForm
                category={selectedCategory}
                onClose={() => setIsEditFormOpen(false)}
                onSave={editCategory} // Pass onSave to the EditCategoryForm
              />
            </div>
          )}

          {/* Summary / Filters */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {categories?.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Category Name</th>
                    <th className="py-2">Actions</th> {/* Add actions column for edit */}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((cat, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{cat.categoryName}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleEditCategory(cat)}
                          className="bg-[#A64DFF] px-4 py-2 text-white rounded-2xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.categoryID)}
                          className="bg-[#A64DFF] px-4 py-2 text-white rounded-2xl"
                        >
                          Delete
                        </button>
                      </td> {/* Edit and delete buttons */}
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

export default CategoryPage;
