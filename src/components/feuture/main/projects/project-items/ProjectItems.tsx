import style from "./ProjectItems.module.scss";
import { client } from "@/libs/mcms/client";
import Link from "next/link";

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
}

export default async function ProjectItems() {
  const data = await client.get({
    endpoint: "blogs",
  });
  return (
    <div className={style.projectItems}>
      <div className={style.projectList}>
      {data.contents.map(
        (post: PostType) => (
          <div key={post.id} className = {style.projectCard}>
            <Link href={`/post/${post.id}`}>
              {post.eyecatch && (
                <img
                  src={post.eyecatch.url}
                  alt={post.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </Link>
          </div>
        )
      )}
      </div>
    </div>
  );
}
