import React, {useEffect, useState} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect.module.css";
import {useGetProducts} from "@/hooks/useGetProducts";

interface IProps {
   color: string | null,
   setColor: (value: string | null) => void,
}

const CategoryColorSelect = ({ color, setColor }: IProps) => {
   const { data } = useGetProducts();
   const [colorsData, setColorsData] = useState<null | string[]>(null)

   useEffect(() => {
      if (!data?.products?.length) return;
      setColorsData(Array.from(new Set(data?.products?.map(elem => elem?.color))))
   }, [data?.products?.length]);

   if (!colorsData) return;

   return (
      <Dropdown className={styles.CategorySelect}>
         <Dropdown.Toggle className={styles.toggle} id="dropdown-autoclose-true">
            Цвет кирпича: {color || 'Все'}
         </Dropdown.Toggle>

         <Dropdown.Menu>
            {
               colorsData
                  .filter(elem => elem !== color)
                  .map(elem => (
                     <Dropdown.Item
                        key={elem}
                        onClick={() => setColor(elem)}
                        className={styles.dropItem}
                     >
                        {elem}
                     </Dropdown.Item>
                  ))
            }
            {
               color &&
               <Dropdown.Item
                  onClick={() => setColor(null)}
                  className={styles.dropItem}
               >
                  Показать все
               </Dropdown.Item>
            }
         </Dropdown.Menu>
      </Dropdown>
   );
};

export default CategoryColorSelect;