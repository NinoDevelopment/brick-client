import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper}>
        <Container className={styles.content}>
           <h1>Контакты</h1>
           <h5>
              Телефон, мессенджеры и форма заявки — ответим и поможем с заказом
           </h5>
        </Container>
     </div>
  );
};

export default PreviewBanner;
