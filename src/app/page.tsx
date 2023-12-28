'use client'
import styles from './page.module.css'
import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import RandomProducts from "@/components/general/RandomProducts/RandomProducts";
import {Container} from "react-bootstrap";
import MeetBanner from "@/components/home-page/MeetBanner/MeetBanner";
import ReviewsSlider from "@/components/home-page/ReviewsSlider/ReviewsSlider";
import Advantages from "@/components/home-page/Advantages/Advantages";

const Home = () => {
  return (
      <main className={styles.main}>
          <PreviewBanner />

          <Container>
              <RandomProducts
                  quantity={6}
                  title={"Вам может понравиться"}
              />
          </Container>

          <MeetBanner />

          <Container>
              <RandomProducts
                  quantity={3}
                  title={"Вам может понравиться"}
              />
          </Container>

          <ReviewsSlider />

          <Container>
              <Advantages />
          </Container>
      </main>
  )
}

export default Home;
