import style from "@/components/layouts/section/SectionLayout.module.scss";

import { ReactNode } from "react";

type SectionLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function SectionLayout({ title, children }: SectionLayoutProps) {
  
  return (
    <div className={style.title}>
      <h1>{title}</h1>
      <div className={style.content}>{children}</div>
    </div>
  );
}
