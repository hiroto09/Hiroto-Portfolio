"use client"
import style from "@/components/layouts/section/SectionLayout.module.scss";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionLayoutProps = {
  title: string;
  background?: string;
  children: ReactNode;
};

export default function SectionLayout({
  title,
  background,
  children,
}: SectionLayoutProps) {
  return (
    <>
      <motion.div 
      initial={{ opacity: 0 ,x: -50}} 
      whileInView={{ opacity: 1 , x:0 }} 
      transition={{ duration: 0.5 }} 
      >
        <div className={style.title}>
          <h1>{title}</h1>
          <div className={`${background ? style[background] : style.content}`}>
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
}
