import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
        <Container className={styles.content}>
           <h1 itemProp="name">Контакты</h1>
           <h5 itemProp="description">
              Телефон, мессенджеры и форма заявки — ответим и поможем с заказом
           </h5>
        </Container>
     </div>
  );
};

export default PreviewBanner;
