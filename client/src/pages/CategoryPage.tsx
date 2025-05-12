import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useCategory } from "../contexts/categoryContext";
import AddCategoryForm from "../components/AddCategoryForm";
import EditCategoryForm from "../components/EditCategoriesForm";

type Props = {};

const CategoryPage = (props: Props) => {
  const { user, token, logout } = useAuth();
  const { categories, totalCategories, fetchCategories, editCategory, removeCategory } = useCategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  console.log("--- CategoryPage Render ---");
  console.log("Categories from Context:", categories);
  console.log("Total Categories from Context:", totalCategories);
  console.log("Current Page:", currentPage);
  console.log("Search Term:", searchTerm);

  useEffect(() => {
    if (!user && token) {
      console.warn("User not available, potential issue with auth context.");
    }
    if (token) {
      fetchCategories(currentPage); // Fetch based on current page
    } else if (!token && user) {
      console.error("Token missing while user is logged in. Logging out.");
      logout();
    } else {
      console.log("Not logged in.");
    }
  }, [user, token, currentPage, fetchCategories, logout]);

  // Reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDeleteCategory = async (categoryID: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await removeCategory(categoryID);
      fetchCategories(currentPage); // Refresh current page after deletion
    }
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsEditFormOpen(true);
  };

  const totalPages = Math.ceil(totalCategories / pageSize);

  // Client-side filtering based on search term
  const filteredCategories = React.useMemo(() => {
    if (!categories) {
      return [];
    }
    if (!searchTerm) {
      return categories;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return categories.filter((cat) =>
      cat.categoryName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [categories, searchTerm]);

  // Since the backend handles pagination, we just render the filtered data
  const currentData = filteredCategories;

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
            <h1 className="text-4xl">Categories</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Add Category Form */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <AddCategoryForm onClose={() => setIsFormOpen(false)} />
            </div>
          )}

          {/* Edit Category Form */}
          {isEditFormOpen && selectedCategory && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <EditCategoryForm
                category={selectedCategory}
                onClose={() => setIsEditFormOpen(false)}
                onSave={editCategory}
              />
            </div>
          )}

          {/* Search Bar */}
          <div className="w-full bg-white border border-[#A64DFF] rounded-xl p-4 flex items-center gap-4">
            <label htmlFor="categorySearch" className="text-lg font-medium">
              Search by Name:
            </label>
            <input
              type="text"
              id="categorySearch"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter category name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {filteredCategories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F4E1FF]">
                  <tr>
                    <th className="py-3 px-6">Category Name</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((cat, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-6">{cat.categoryName}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleEditCategory(cat)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-2xl mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.categoryID)}
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

export default CategoryPage;