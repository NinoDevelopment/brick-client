import {useAppDispatch, useAppSelector} from "@/store/store";
import {useEffect} from "react";
import {getGallery} from "@/store/slices/gallerySlice";

export const useGetGallery = () => {
   const categories = useAppSelector(state => state.gallery);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!categories.categories.length) {
         dispatch(getGallery())
      }
   },[])

   return {
      data: categories,
      updateGallery: () => dispatch(getGallery())
   };
}