'use client'
import styles from './page.module.css'
import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import RandomProducts from "@/components/general/RandomProducts/RandomProducts";
import {Container} from "react-bootstrap";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";

const Home = () => {
  return (
      <main className={styles.main}>
          <PreviewBanner />
          <Container>
              <RandomProducts quantity={6} title={"Вам может понравиться"} />
          </Container>
          <AboutCompany />
          <Container>
              <RandomProducts quantity={3} title={"Вам может понравиться"} />
          </Container>
          <CalcBanner />
         <ProductTypes />
         <GalleryBanner />
      </main>
  )
}

export default Home;
