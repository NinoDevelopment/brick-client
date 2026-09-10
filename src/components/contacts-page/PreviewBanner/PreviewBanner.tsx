import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper}>
        <Container className={styles.content}>
           <h1>Контакты</h1>
           <p className={styles.lead}>
              Телефон, мессенджеры и форма заявки — ответим и поможем с заказом
           </p>
        </Container>
     </div>
  );
};

export default PreviewBanner;
