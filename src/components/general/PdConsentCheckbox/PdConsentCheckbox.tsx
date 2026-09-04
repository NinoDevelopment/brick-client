"use client";

import Link from "next/link";
import { LINK_CONSENT, LINK_PRIVACY } from "@/constants/links";
import styles from "./PdConsentCheckbox.module.css";

interface IPdConsentCheckbox {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PdConsentCheckbox = ({ id, checked, onChange }: IPdConsentCheckbox) => {
  return (
    <label className={styles.label} htmlFor={id}>
      <input
        id={id}
        className={styles.input}
        type="checkbox"
        checked={checked}
        required
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        Я даю{" "}
        <Link href={LINK_CONSENT} target="_blank">
          согласие на обработку персональных данных
        </Link>{" "}
        и принимаю{" "}
        <Link href={LINK_PRIVACY} target="_blank">
          Политику обработки персональных данных
        </Link>
        .
      </span>
    </label>
  );
};

export default PdConsentCheckbox;
