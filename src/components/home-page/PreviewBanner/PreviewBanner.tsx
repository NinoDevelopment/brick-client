import styles from './PreviewBanner.module.css';
import Link from 'next/link';

const PreviewBanner = () => {
  return (
     <div className={styles.PreviewBanner}>
        <video
           playsInline
           autoPlay
           muted
           loop
           disablePictureInPicture
           className={styles.video}
           poster='/other/back-video.png'
        >
           <source src='/videos/bg-preview.mp4' type='video/mp4'/>
        </video>

        <div className={styles.content}>
           <h1>
              Купить <b>кирпич</b> <br/> в Нижнем Новгороде
           </h1>
           <h4>
              Производим кирпич из глины собственного карьера <br/>
              и доставляем по Нижнему Новгороду <br/>
              и всей Нижегородской области
           </h4>

           <Link href="/catalog">
              Перейти в каталог
           </Link>
        </div>
     </div>
  );
};

export default PreviewBanner;
