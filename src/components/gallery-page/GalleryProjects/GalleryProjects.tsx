'use client'
import React from 'react';
import styles from './GalleryProjects.module.css';
import {Container} from "react-bootstrap";
import {useGetGallery} from "@/hooks/useGetGallery";
import GalleryItem from "@/components/gallery-page/GalleryItem/GalleryItem";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";

const GalleryProjects = () => {

   const { data } = useGetGallery()

   return (
      <Container className={styles.wrapper}>
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

export default GalleryProjects;