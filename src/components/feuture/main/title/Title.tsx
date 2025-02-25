"use client";
import { motion } from "framer-motion";
import style from "./Title.module.scss";

export default function Title() {
  return (
    <motion.div
      initial={{ opacity: 0, originY: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.titleArea}>
        <div className={style.title}>
          <h1>INOUE</h1>
          <h1>PORTFOLIO</h1>
        </div>
      </div>
    </motion.div>
  );
}
