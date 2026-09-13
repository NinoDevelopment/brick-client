"use client";
import React, { type SubmitEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_ADMIN_AUTH } from "@/constants/api";
import { LINK_ADMIN } from "@/constants/links";

const Page = () => {
  const [key, setKey] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    window.localStorage.removeItem("key");
  }, []);

  const handleSend = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_ADMIN_AUTH, {}, key)
      .then((res) => {
        if (res.data === true) {
          globalThis.location.replace(LINK_ADMIN);
          return;
        }
        setError("Ключ не принят. Проверьте значение и попробуйте снова.");
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          setError("Ключ не принят. Проверьте значение и попробуйте снова.");
          return;
        }
        setError("Не удалось войти. Проверьте ключ и соединение с API.");
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <div className={styles.main}>
      <form className={styles.card} onSubmit={handleSend}>
        <p className={styles.kicker}>Служебный раздел</p>
        <h1>Вход в админку</h1>
        <label className={styles.label} htmlFor="admin-key">
          Ключ доступа
        </label>
        <input
          id="admin-key"
          className={styles.input}
          type="password"
          required
          autoComplete="current-password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Введите ключ"
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <button className="app-btn" disabled={load} type="submit">
          {load ? "Проверка…" : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Page;
