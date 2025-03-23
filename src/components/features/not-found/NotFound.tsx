import style from "./NotFound.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={style.notFound}>
      <div className={style.notFoundContainer}>
        <h1>404 Not Found</h1>
        <Link href="/" className={style.homeLink}>
          {" "}
          ホームへ戻る{" "}
        </Link>
      </div>
    </div>
  );
}
