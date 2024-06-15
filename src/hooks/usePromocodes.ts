import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getPromocodes } from "@/store/slices/promocodeSlice";

export const useGetPromocodes = () => {
  const data = useAppSelector((state) => state.promocodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data.data.length) {
      dispatch(getPromocodes());
    }
  }, [data.data.length]);

  return {
    data: data,
    updatePromocodes: () => dispatch(getPromocodes()),
  };
};
