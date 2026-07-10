"use client";
import { useState } from "react";

import styles from "./CalcWrapper.module.css";
import { Container } from "react-bootstrap";
import CalcSquare from "@/components/calculator/CalcSquare/CalcSquare";
import CalcValues from "@/components/calculator/CalcValues/CalcValues";

const CalcWrapper = () => {
  const [selected, setSelected] = useState<"square" | "volume">("square");

  return (
    <div className={styles.wrapper}>
      <Container>
        <h2 className={styles.title}>Выберите способ расчёта</h2>

        <div className={styles.btnsContainer}>
          <button
            onClick={() => setSelected("square")}
            disabled={selected === "square"}
          >
            По площади
          </button>
          <button
            onClick={() => setSelected("volume")}
            disabled={selected === "volume"}
          >
            По объёму
          </button>
        </div>

        {selected === "square" && <CalcSquare />}
        {selected === "volume" && <CalcValues />}
      </Container>
    </div>
  );
};

export default CalcWrapper;
