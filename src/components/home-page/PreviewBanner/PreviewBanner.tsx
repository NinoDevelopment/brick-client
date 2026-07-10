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
        preload="metadata"
        disablePictureInPicture
        className={styles.video}
        poster="/other/back-video.png"
      >
        <source src="/videos/bg-preview.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1>
          Купить <b>кирпич</b> <br /> в Нижнем Новгороде
        </h1>
        <h4>
          Производим из глины собственного карьера <br />
          и доставляем по Нижнему Новгороду <br />
          и Нижегородской области
        </h4>

        <Link href="/catalog">Смотреть каталог</Link>
      </div>
    </div>
  );
};

export default PreviewBanner;
