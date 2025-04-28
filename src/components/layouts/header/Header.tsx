import Link from "next/link";
import style from "./Header.module.scss";
import Icon from "@/components/const/icons/Icon";

export default function Header() {
  return (
    <header className={style.header}>
      <Link href="/" className={style.rootLink}>
        <h2>InoueHiroto</h2>
      </Link>
      <div className={style.icons}>
        <Link href="https://github.com/hiroto09">
          <Icon iconKey="github" size="40px" color = "white"/>
        </Link>
        <Link href="https://x.com/hi0929_?s=21&t=USYX3EVs7OAGj8gSz3LCug">
          <Icon iconKey="x" size="40px" color = "white"/>
        </Link>
        <Link href="https://www.instagram.com/hiroto.0929?igsh=YXFwZ2VseTRudmlw&utm_source=qr_">
          <Icon iconKey="instagram" size="40px" color = "white"/>
        </Link>
      </div>
    </header>
  );
}
