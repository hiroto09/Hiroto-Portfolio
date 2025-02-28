import style from "./PostCard.module.scss";
import { client } from "@/libs/mcms/client";
import Link from "next/link";
import Image from "next/image";

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
}

interface PostCardProps {
  category?: string;
}

export default async function PostCard({
  category,
}: PostCardProps): Promise<JSX.Element> {
  try {
    const data = await client.get({
      endpoint: "blogs",
      queries: { filters: `category[equals]${category}` },
    });

    return (
      <div className={style.projectItems}>
        <div className={style.projectList}>
          {data.contents.map((post: PostType) => (
            <div key={post.id} className={style.projectCard}>
              <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              <div>
                {post.eyecatch && (
                  <div className={style.book}>
                    <h3 className={style.title}>{post.title}</h3>
                    <Image
                      src={post.eyecatch.url}
                      alt={post.title}
                      className={style.bookImg}
                      width={100}
                      height={100}
                      layout="responsive"
                      style={{ borderRadius: "0px 0px 4px 4px " }}
                    />
                  </div>
                )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return <div>Failed to load posts.</div>;
  }
}
