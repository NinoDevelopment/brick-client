import styles from './PreviewBanner.module.css';
import Link from 'next/link';

const PreviewBanner = () => {
  return (
     <div className={styles.PreviewBanner} itemScope itemType="https://schema.org/VideoObject">
        <video
           playsInline
           autoPlay
           muted
           loop
           disablePictureInPicture
           className={styles.video}
           poster='/other/back-video.png'
           itemProp="video"
        >
           <source src='/videos/bg-preview.mp4' type='video/mp4'/>
        </video>

        <div className={styles.content}>
           <h1 itemProp="name">
              <b>Кирпич</b> от поставщика <br/> в Нижнем Новгороде
           </h1>
           <h4 itemProp="description">
              Производим наши кирпичи из высококачественной <br/>
              глины собственного карьера, а также осуществляем <br/>
              доставку по всей Нижегородской области
           </h4>

           <Link href="/catalog" itemProp="potentialAction">
              Купить кирпич с доставкой
           </Link>
        </div>

        <meta itemProp="title" content="Купить кирпич с доставкой в Нижнем Новгороде | Кирпичный завод Ковернино"/>
        <meta itemProp="description" content="Кирпич с доставкой от производителя в Нижнем Новгороде. Большой выбор: красный, керамический, облицовочный и строительный кирпич по выгодным ценам. Доставка кирпича в Нижний Новгород, Арзамас, Балахну, Дзержинск, Бор и другие города Нижегородской области. Закажите кирпич прямо сейчас!"/>
        <meta itemProp="thumbnailUrl" content={`${process.env.NEXT_PUBLIC_PROD_URL}/other/back-video.png`}/>
        <meta itemProp="uploadDate" content="2025-03-22"/>
        <meta itemProp="duration" content="PT30S"/>
     </div>
  );
};

export default PreviewBanner;
