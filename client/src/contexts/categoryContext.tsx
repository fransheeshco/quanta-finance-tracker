// CategoryContext.tsx
import React, {
  createContext,
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
  totalCategories: number;
  fetchCategories: (page: number) => Promise<void>;
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
  const [totalCategories, setTotalCategories] = useState(0);
  const { token } = useAuth();

  const fetchCategories = useCallback(
    async (page: number) => {
      if (!token) return;
      try {
        const response = (await getCategoriesAPI({
          token,
          sortField: "categoryID",
          sortBy: "asc",
          page,
        })); 

        console.log("Response from getCategoriesAPI:", response); // For debugging

        if (response && response.data) {
          setCategories(response.data.rows);
          setTotalCategories(response.data.count);
        } else {
          setCategories([]);
          setTotalCategories(0);
        }
      } catch (err) {
        toast.error("Failed to fetch categories");
        setCategories([]);
        setTotalCategories(0);
      }
    },
    [token]
  );

  const addCategory = async (categoryName: string) => {
    if (!token) return;
    try {
      await createCategoryAPI(categoryName, token);
      await fetchCategories(1);
      toast.success("Category added!");
    } catch {
      toast.error("Failed to add category.");
    }
  };

  const editCategory = async (categoryName: string, categoryID: number) => {
    if (!token) return;
    try {
      await updateCategoryAPI(categoryName, categoryID, token);
      await fetchCategories(1);
      toast.success("Category updated!");
    } catch {
      toast.error("Failed to update category.");
    }
  };

  const removeCategory = async (categoryID: number) => {
    if (!token) return;
    try {
      await deleteCategoryAPI(categoryID, token);
      await fetchCategories(1);
      toast.success("Category deleted.");
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  const contextValue = useMemo(
    () => ({
      categories,
      totalCategories,
      fetchCategories,
      addCategory,
      editCategory,
      removeCategory,
    }),
    [categories, totalCategories, fetchCategories, addCategory, editCategory, removeCategory]
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => React.useContext(CategoryContext);