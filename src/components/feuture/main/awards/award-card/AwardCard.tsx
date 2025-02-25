import { url } from "inspector";
import style from "./AwardCard.module.scss";
import Link from "next/link";

const AwardsMap = {
  kinokuni: {
    title: "きのくにICTプログラミングコンテスト",
    award: "優秀賞",
    date: "2022.12",
    work: "お絵描きアプリ",
    url:"000"
  },
  kyaraban2023: {
    title: "技育CAMP キャラバンハッカソン vol.2",
    award: "最優秀賞",
    date: "2023.06",
    work: "かみあぷり",
    url:"/post/001"
  },
  ad3: {
    title: "技育CAMP アドバンス vol.3",
    award: "企業賞",
    date: "2023.09",
    work: "かみあぷり",
    url:"/post/001"
  },
  sumer2023: {
    title: "HackSummer東海2023",
    award: "優秀賞",
    date: "2023.09",
    work: "おしゃべりずんだもん",
    url:"/post/002"
  },
  Aichi2023: {
    title: "HackAichi2023",
    award: "企業賞",
    date: "2023.09",
    work: "社食の革命",
    url:"/post/003"
  },
  camp2024: {
    title: "技育CAMP Vol.16",
    award: "優秀賞",
    date: "2024.11",
    work: "目覚まし黒電話",
    url:"/post/009"
  },
  haku2024: {
    title: "技育博2024",
    award: "企業賞",
    date: "2024.12",
    work: "目覚まし黒電話",
    url:"/post/009"
  },
};

const AwardKeys = Object.keys(AwardsMap) as Array<keyof typeof AwardsMap>;

export default function AwardCard() {
  return (
    <div className={style.list}>
      {AwardKeys.map((awardKey) => {
        const { title, award, date, work, url } = AwardsMap[awardKey];
        return (

          <div key={awardKey} className={style.item}>
              <Link href={url}>
                <div className={style.card}>
                    <p className={style.type}>{award}</p>
                    <p className={style.title}>{title}</p>
                    <p className={style.date}>{date}</p>
                    <p className={style.work}>{work}</p>
                    <div className={style.arow}>▶︎ </div>
                </div>
              </Link>
          </div>
        );
      })}

    </div>
  );
}
