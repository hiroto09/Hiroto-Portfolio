import "./About.scss";
import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="content-title">
        <h1>About</h1>
        <div className="content">
          <div className="about-me">
            <Image src="/syati.webp" alt="profile" width={200} height={200} />
            <p className="about-me">井上翔人</p>
          </div>
          <p className="about-text">
            和歌山県の標高800以上の場所にある町育ちの愛知県の大学生です。
            今は大学で情報学を学んでいます。趣味は絵,ゲーム,音楽,景色です!!
            将来は、作成したサービスを利用していただいたユーザーに機能面だけでなく視覚的にも刺激を与えれるエンジニアになれるよう努力しています。
            現在は主にWebをメインとして技術を磨いるところですが、Web以外の技術にも挑戦していこうと考えています。
          </p>
        </div>
      </div>
    </>
  );
}
