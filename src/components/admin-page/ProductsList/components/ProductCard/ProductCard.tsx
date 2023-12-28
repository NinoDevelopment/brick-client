import React, {useState} from 'react';
import styles from "./ProductCard.module.css";
import {Button, ButtonGroup, Card} from "react-bootstrap";
import {IProductId, IProductImg} from "@/types/products";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import {handleRequest} from "@/functions/handleRequest";
import {API_PRODUCT, API_PRODUCT_IMG} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetProducts} from "@/hooks/useGetProducts";
import ModalConfirm from "@/ui/ModalConfirm/ModalConfirm";
import ProductPrice from "@/components/admin-page/ProductsList/components/ProductCard/components/ProductPrice";
import ProductRedact from "@/components/admin-page/ProductRedact/ProductRedact";
import ProductInfo from "@/components/admin-page/ProductsList/components/ProductCard/components/ProductInfo";
import {REQUEST_METHODS} from "@/types/general";
import {useFetch} from "@/hooks/useFetch";
import Link from "next/link";
import {LINK_PRODUCT} from "@/constants/links";

interface IProductCard {
	data: IProductId,
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

	const { updateProducts } = useGetProducts();
	const { data:images } = useFetch<IProductImg>(API_PRODUCT_IMG(data._id), REQUEST_METHODS.GET, {});
	const [showDelete, setShowDelete] = useState(false);
	const [showRedact, setShowRedact] = useState(false);
	const [load, setLoad] = useState<boolean>(false);

	const handleDelete = () => {
		setLoad(true);
		handleRequest(REQUEST_METHODS.DELETE, API_PRODUCT, {itemIds: [data._id]})
			.then(() => {
				TOAST_SUCCESS("Товар успешно удален");
				updateProducts();
			})
			.catch(() => TOAST_ERROR("Ошибка удаления товара"))
			.finally(() => {
				setLoad(false);
				setShowDelete(false);
			})
	}

	return (
		<>
			<Card className={styles.ProductCard}>
				{/*SWIPER*/}
				<SwiperNavigation images={images?.images} />

				<Card.Body>
					<Link href={LINK_PRODUCT(data._id)}>
						<Card.Title>{data.name}</Card.Title>
					</Link>

					{/*INFO*/}
					<ProductInfo data={data} />

					{/*PRICE AND WEIGHT*/}
					<ProductPrice data={data} />
				</Card.Body>

				<Card.Footer>
					<ButtonGroup className={"w-100"}>
						{/*не можем изменять если фотки не загрузились*/}
						<Button
							variant="light" size={"sm"}
							onClick={() => setShowRedact(true)}
							hidden={!images?.images}
						>
							Изменить
						</Button>

						<Button variant="dark" size={"sm"} onClick={() => setShowDelete(true)}>
							Удалить
						</Button>
					</ButtonGroup>
				</Card.Footer>
			</Card>

			<ModalConfirm
				show={showDelete}
				title={`Удаление товара "${data.name}"`}
				handleClose={() => setShowDelete(false)}
				handleConfirm={handleDelete}
				load={load}
			/>

			{//если фото загрузились то рендерим модалку для изменения
				images?.images &&
				<ProductRedact
					data={{...data, images: images?.images}}
					show={showRedact}
					handleClose={() => setShowRedact(false)}
				/>
			}
		</>
	);
};

export default ProductCard;
