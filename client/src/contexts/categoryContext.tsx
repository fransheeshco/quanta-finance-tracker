import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Categories } from "../interfaces/interfaces";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  updateCategoryAPI,
  getCategoriesAPI,
} from "../api/CategoriesAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type CategoryTypeContext = {
  categories: Categories[] | null;
  fetchCategories: () => Promise<void>;
  addCategory: (categoryName: string) => Promise<void>;
  editCategory: (categoryName: string, categoryID: number) => Promise<void>;
  removeCategory: (categoryID: number) => Promise<void>;
};

type Props = { children: ReactNode };

const CategoryContext = createContext<CategoryTypeContext>(
  {} as CategoryTypeContext
);

export const CategoryProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const { user, token } = useAuth();

  const fetchCategories = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getCategoriesAPI({
        token, // Pass token
        sortField: "categoryID", // Default sort field
        sortBy: "asc", // Default sort direction
        page: 1, // Default page number
      });
      if (response) {
        setCategories(response); // Set the rows directly from the response
      }
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  }, [token]);
  

  const addCategory = async (categoryName: string) => {
    if (!token) return;
    try {
      await createCategoryAPI(categoryName, token);
      await fetchCategories();
      toast.success("Category added!");
    } catch {
      toast.error("Failed to add category.");
    }
  };

  const editCategory = async (categoryName: string, categoryID: number) => {
    if (!token) return;
    try {
      await updateCategoryAPI(categoryName, categoryID, token);
      await fetchCategories();
      toast.success("Category updated!");
    } catch {
      toast.error("Failed to update category.");
    }
  };

  const removeCategory = async (categoryID: number) => {
    if (!token) return;
    try {
      await deleteCategoryAPI(categoryID, token);
      await fetchCategories();
      toast.success("Category deleted.");
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token, fetchCategories]);

  const contextValue = useMemo(
    () => ({
      categories,
      fetchCategories,
      addCategory,
      editCategory,
      removeCategory,
    }),
    [categories, fetchCategories, addCategory, editCategory, removeCategory]
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => React.useContext(CategoryContext);
