import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getGallery } from "@/store/slices/gallerySlice";

export const useGetGallery = (skipFetch = false) => {
  const categories = useAppSelector((state) => state.gallery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (skipFetch) return;
    dispatch(getGallery());
  }, [skipFetch, dispatch]);

  return {
    data: categories,
    updateGallery: () => dispatch(getGallery()),
  };
};
