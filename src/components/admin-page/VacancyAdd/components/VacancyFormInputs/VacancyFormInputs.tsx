import React from 'react';
import styles from './VacancyFormInputs.module.css';
import {FloatingLabel, Form, FormControl} from "react-bootstrap";
import {IVacancy, IVacancyId} from "@/types/vacancies";

interface IVacancyForm {
	formData: IVacancy | IVacancyId,
	setFormData: (formData: IVacancy | IVacancyId) => void,
}

const VacancyFormInputs: React.FC<IVacancyForm> = ({ formData, setFormData }) => {

	return (
		<div className={styles.VacancyFormInputs}>
			<FloatingLabel label="Название">
				<FormControl
					required
					value={formData?.name}
					onChange={e => setFormData({...formData, name: e.target.value})}
				/>
			</FloatingLabel>

			<FloatingLabel label="Описание">
				<FormControl
					as={"textarea"} style={{ height: 100 }}
					required
					value={formData?.description}
					onChange={e => setFormData({...formData, description: e.target.value})}
				/>
			</FloatingLabel>

			<FloatingLabel label="Доп. информация">
				<FormControl
					as={"textarea"} style={{ height: 100 }}
					value={formData?.additionalInfo}
					onChange={e => setFormData({...formData, additionalInfo: e.target.value})}
				/>
			</FloatingLabel>

			<FloatingLabel label="Зарплата">
				<FormControl
					required
					value={formData?.salary || ''}
					onChange={e => setFormData({...formData, salary: +e.target.value})}
				/>
			</FloatingLabel>

			<Form.Switch
				className={"my-2"}
				label="Актуальная вакансия"
				checked={formData?.show}
				onChange={() => setFormData({...formData, show: !formData?.show})}
			/>
		</div>
	);
};

export default VacancyFormInputs;
