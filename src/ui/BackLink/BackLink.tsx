import React from 'react';
import styles from "./BackLink.module.css";
import Link from "next/link";

interface IBackLink {
	link: string,
	text: string,
}

const BackLink: React.FC<IBackLink> = ({ link, text }) => {
	return (
		<Link href={link} className={styles.BackLink}>
			<img src="/icons/back-arrow.svg" alt="<" />
			<span>{text}</span>
		</Link>
	);
};

export default BackLink;
