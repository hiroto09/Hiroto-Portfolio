import "./About.scss";
export default function About() {
  return (
    <>
      <div className="about">
        <h1>About</h1>
        <div className="about-content">
          <div className="about-me">
            <img src="/syati.webp" alt="syati" />
            <p className="about-me">井上翔人</p>
          </div>
          <p className="about-text">
            和歌山県の標高800以上の場所にある町育ちの愛知県の大学生です。
            今は大学で情報学を学んでいます。趣味は絵,ゲーム,音楽,景色です。
            今は主にWebをメインとして技術を磨いていますが、Web以外の技術も伸ばしていきたいと考えています。
          </p>
        </div>
      </div>
    </>
  );
}
