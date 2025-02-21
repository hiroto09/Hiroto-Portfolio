import "./AwardCard.scss";

const AwardsMap = {
  kinokuni: {
    title: "きのくにICTプログラミングコンテスト",
    award: "優秀賞",
    date: "2022.12",
    work: "お絵描きアプリ",
  },
  kyaraban2023: {
    title: "技育CAMP キャラバンハッカソン vol.2",
    award: "最優秀賞",
    date: "2023.06",
    work: "かみあぷり",
  },
  ad3: {
    title: "技育CAMP アドバンス vol.3",
    award: "企業賞",
    date: "2023.09",
    work: "かみあぷり",
  },
  sumer2023: {
    title: "HackSummer東海2023",
    award: "優秀賞",
    date: "2023.09",
    work: "おしゃべりずんだもん",
  },
  Aichi2023: {
    title: "HackAichi2023",
    award: "企業賞",
    date: "2023.09",
    work: "社食の革命",
  },
  camp2024: {
    title: "技育CAMP Vol.16",
    award: "優秀賞",
    date: "2024.11",
    work: "目覚まし黒電話",
  },
  haku2024: {
    title: "技育博2024",
    award: "企業賞",
    date: "2024.12",
    work: "目覚まし黒電話",
  },
};

const AwardKeys = Object.keys(AwardsMap) as Array<keyof typeof AwardsMap>;

export default function AwardCard() {
  return (
    <div className="award-list">
      {AwardKeys.map((awardKey) => {
        const { title, award, date, work } = AwardsMap[awardKey];

        return (
          <div key={awardKey} className="award-list">
            <div className="award-card">
                <p className="award-award">{award}</p>
                <p className="award-title">{title}</p>
                <p className="award-date">{date}</p>
                <p className="award-work">{work}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
