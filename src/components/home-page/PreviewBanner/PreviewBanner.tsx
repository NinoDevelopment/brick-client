'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './PreviewBanner.module.css';
import Link from 'next/link';

const PreviewBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        if (!cancelled) setShowVideo(true);
      } catch {
        if (!cancelled) setShowVideo(false);
      }
    };

    const onCanPlay = () => {
      void tryPlay();
    };

    video.addEventListener('canplay', onCanPlay);
    video.load();

    if (video.readyState >= 3) {
      void tryPlay();
    }

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  return (
    <div className={styles.PreviewBanner}>
      <video
        ref={videoRef}
        playsInline
        muted
        loop
        preload="auto"
        disablePictureInPicture
        className={`${styles.video} ${showVideo ? styles.videoVisible : ''}`}
        poster="/other/back-video.png"
        onError={() => setShowVideo(false)}
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
