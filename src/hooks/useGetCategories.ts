import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getCategories, selectCategory } from "@/store/slices/categoriesSlice";

export const useGetCategories = () => {
  const data = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data.categories.length) {
      dispatch(getCategories());
    }
  }, [data.categories.length]);

  return {
    data: data,
    updateCategories: () => dispatch(getCategories()),
    selectCategory: (id: string | null) => dispatch(selectCategory(id)),
  };
};
