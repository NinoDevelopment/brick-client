import React, {FormEvent, useState} from 'react';
import BackLink from "@/ui/BackLink/BackLink";
import {LINK_ORDER, LINK_ORDER_ID} from "@/constants/links";
import styles from './PaymentForm.module.css';
import {Form, Spinner} from "react-bootstrap";
import UserForm from "@/components/order-page/OrderForm/components/UserForm/UserForm";
import {EDelivery, IOrderWithSchetForm} from "@/types/order";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {ORDER_FORM_SCHET_INITIAL} from "@/constants/order";
import {TOAST_ERROR} from "@/constants/toasts";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_ORDER} from "@/constants/api";
import {clearShopCart} from "@/store/slices/shopCartSlice";
import DeliverySelect from "@/components/order-page/OrderForm/components/DeliverySelect/DeliverySelect";
import AddressForm from "@/components/order-page/OrderForm/components/AddressForm/AddressForm";
import ShopAddress from "@/components/order-page/OrderForm/components/ShopAddress/ShopAddress";

const PaymentForm = () => {

   const shopCartData = useAppSelector(state => state.shopCart.data);
   const [formData, setFormData] = useState<IOrderWithSchetForm>(ORDER_FORM_SCHET_INITIAL(shopCartData));
   const [load, setLoad] = useState<boolean>(false)
   const dispatch = useAppDispatch();
   const [promocode, setPromocode] = useState<string>('');

   const handleSend = (e:FormEvent) => {
      e.preventDefault();

      //check items length
      if (!formData.positions || !formData?.positions?.length) {
         TOAST_ERROR("Товары для заказа не выбраны!")
         return;
      }

      // //check selected shop if delivery type === self
      if (formData.deliveryType === EDelivery.SELF && !formData.shopAddress) {
         TOAST_ERROR("Выберите откуда будет совершен самовывоз!")
         return;
      }

      //check phone number
      if (!formData.phoneNumber.match(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/)) {
         TOAST_ERROR("Введите телефон в формате +7(XXX)XXX-XX-XX!")
         return;
      }

      setLoad(true)
      handleRequest(REQUEST_METHODS.POST, API_ORDER, formData)
         .then(res => {
            dispatch(clearShopCart()); //чистим корзину
            globalThis.location.replace(LINK_ORDER_ID(res.data._id)); //редиректим на статус
         })
         .catch(() => TOAST_ERROR("Ошибка оформления заказа, пожалуйста попробуйте позже!"))
         .finally(() => setLoad(false))
   }

   return (
      <div className={styles.wrapper}>
         <BackLink link={LINK_ORDER} text={'В корзину'} />
         <h1 className={styles.title}>Выставление счёта на оплату</h1>

         <Form onSubmit={handleSend} className={styles.form}>
            {/*@ts-ignore*/}
            <UserForm formData={formData} setFormData={setFormData}/>

            {/*@ts-ignore*/}
            <DeliverySelect formData={formData} setFormData={setFormData} />
            {
               formData.deliveryType === EDelivery.COURIER &&
               //@ts-ignore
               <AddressForm formData={formData} setFormData={setFormData} />
            }
            {
               formData.deliveryType === EDelivery.SELF &&
               //@ts-ignore
               <ShopAddress formData={formData} setFormData={setFormData} />
            }

            <label className={'mt-4'}>Промокод</label>
            <div className={styles.promocodeContainer}>
               <input
                  placeholder={'Промокод'}
                  value={promocode}
                  onChange={e => setPromocode(e.target.value)}
               />
               <button
                  onClick={() => {
                     setFormData({...formData, promocode})
                     setPromocode('')
                  }}
                  type={'button'}
               >
                  Применить
               </button>
            </div>

            <label>Название банка</label>
            <input
               placeholder={'Введите полное наименование банка'}
               required
               value={formData.schetInfo?.bankName}
               onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, bankName: e.target.value}})}
            />

            <label>БИК</label>
            <input
               placeholder={'XXXXXXXXXX'}
               required
               value={formData.schetInfo?.bic}
               onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, bic: e.target.value}})}
            />

            <label>Корреспондентский счёт</label>
            <input
               placeholder={'XXXXXXXXXXXXXXXXXXXX'}
               required
               value={formData.schetInfo?.correspondentAccount}
               onChange={e => setFormData({
                  ...formData,
                  schetInfo: {...formData.schetInfo, correspondentAccount: e.target.value}
               })}
            />

            <label>Номер счёта получателя</label>
            <input
               placeholder={'Введите номер счёта получателя'}
               required
               value={formData.schetInfo?.receiverAccount}
               onChange={e => setFormData({
                  ...formData,
                  schetInfo: {...formData.schetInfo, receiverAccount: e.target.value}
               })}
            />

            <label>ИНН</label>
            <input
               placeholder={'XXXXXXXXXX'}
               required
               value={formData.schetInfo?.inn}
               onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, inn: e.target.value}})}
            />

            <label>КПП</label>
            <input
               placeholder={'XXXXXXXXX'}
               required
               value={formData.schetInfo?.kpp}
               onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, kpp: e.target.value}})}
            />

            <button type={'submit'} disabled={load}>
               {load ? <Spinner size={'sm'} /> : 'Выставить счёт'}
            </button>
         </Form>
      </div>
   );
};

export default PaymentForm;