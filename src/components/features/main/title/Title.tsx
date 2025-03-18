import style from "./Title.module.scss";

export default function Title() {
  return (
      <div className={style.titleArea}>
        <div className={style.title}>
          <h1>INOUE</h1>
          <h1>PORTFOLIO</h1>
        </div>
      </div>
  );
}
