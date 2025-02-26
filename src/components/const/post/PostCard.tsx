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
              <Link href={`/post/${post.id}`}>
                {post.eyecatch && (
                  <Image
                    src={post.eyecatch.url}
                    alt={post.title}
                    width={800}
                    height={400}
                    layout="responsive"
                  />
                )}
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
