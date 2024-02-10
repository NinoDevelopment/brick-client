'use client'
import React from 'react';
import styles from './page.module.css';
import {Container} from "react-bootstrap";
import {useGetGallery} from "@/hooks/useGetGallery";
import GalleryItem from "@/components/gallery-page/GalleryItem/GalleryItem";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";

const page = () => {

   const { data } = useGetGallery()

   return (
      <Container className={styles.wrapper}>
         <h1 className={styles.title}>
            <b>Галерея</b> завода Ковернино
         </h1>

         <div className={styles.itemsContainer}>
            {
               !data &&
               <div className={styles.loader}>
                  <SpinnerPrimary />
               </div>
            }

            {
               data && !data?.categories?.length &&
               <h5 className={styles.noItems}>Список категорий галлереи пуст!</h5>
            }

            {
               !!data?.categories?.length &&
               data?.categories?.map(elem => <GalleryItem key={elem._id} data={elem} />)
            }
         </div>
      </Container>
   );
};

export default page;