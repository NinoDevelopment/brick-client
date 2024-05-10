import React, { useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { IOrderWithSchetForm } from '@/types/order';
import styles from './BankForm.module.css';

interface IBankForm {
    formData: IOrderWithSchetForm,
    setFormData: (data: IOrderWithSchetForm) => void,
}

const BankForm: React.FC<IBankForm> = ({ formData, setFormData }) => {
    const [inn, setINN] = useState('');

    const handleINNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setINN(query);

        if (query.length === 10) {
            fetchDadata(query);
        }
    };

    const fetchDadata = (query: string) => {
        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
        const token = '2698f22a5b709a572fb82b24e584c938c65a6a1b';
        const options: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token ' + token,
            },
            body: JSON.stringify({ query: query }),
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                const companyData = data.suggestions[0].data;
                setFormData({
                    ...formData,
                    schetInfo: {
                        ...formData.schetInfo,
                        kpp: companyData.kpp,
                        companyName: companyData.name.short_with_opf,
                        companyAddress: companyData.address.unrestricted_value,
                        inn: query,
                    },
                });
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={styles.BankForm}>
            <header>
                <h2>Реквизиты компании</h2>
            </header>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    required
                    placeholder={'ИНН*'}
                    value={inn}
                    onChange={handleINNChange}
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    required
                    placeholder={'КПП*'}
                    value={formData.schetInfo?.kpp}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, kpp: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    required
                    placeholder={'Компания*'}
                    value={formData.schetInfo?.companyName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, companyName: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    required
                    placeholder={'Юр адрес компании*'}
                    value={formData.schetInfo?.companyAddress}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, companyAddress: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    placeholder={'Полное наименование банка (необязательно)'}
                    value={formData.schetInfo?.bankName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, bankName: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    placeholder={'БИК (необязательно)'}
                    value={formData.schetInfo?.bic}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, bic: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    placeholder={'Корреспондентский счёт (необязательно)'}
                    value={formData.schetInfo?.correspondentAccount}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, correspondentAccount: e.target.value },
                        })
                    }
                />
            </FormGroup>

            <FormGroup className={styles.block + ' ' + styles.w100}>
                <input
                    placeholder={'Номер счёта получателя (необязательно)'}
                    value={formData.schetInfo?.receiverAccount}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            schetInfo: { ...formData.schetInfo, receiverAccount: e.target.value },
                        })
                    }
                />
            </FormGroup>
        </div>
    );
};

export default BankForm;