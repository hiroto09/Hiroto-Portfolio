import { ReactNode } from "react";
import style from "@/components/layouts/section/SectionLayout.module.scss";

type SectionLayoutProps = {
  title: string;
  background?: string;
  children?: ReactNode;
};

export default function SectionLayout({
  title,
  background,
  children,
}: SectionLayoutProps) {
  return (
    <div className={style.sectionWrapper}>
      <div className={style.title}>
        <h1>{title}</h1>
      </div>

      {!background ? (
        <div className={style.content}>
          <div className={style.liquidGlassWrapper}>
            <div className={style.liquidGlassTint}></div>
            <div className={style.liquidGlassShine}></div>
            <div className={style.liquidGlassText}>
              <div className={style.dock}>{children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style[background]}>{children}</div>
      )}
    </div>
  );
}
