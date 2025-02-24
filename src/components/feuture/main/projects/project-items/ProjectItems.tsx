import { client } from "@/libs/mcms/client";
import Link from "next/link";

export default async function ProjectItems() {
  const data = await client.get({
    endpoint: "blogs",
  });

  console.log(data); // デバッグ用にログ出力

  return (
    <main>
      <ul>
        {data.contents.map(
          (post: {
            id: string;
            title: string;
            content: string;
            eyecatch?: { url: string };
          }) => (
            <div key={post.id}>
              <Link href={`/post/${post.id}`}>
                {post.eyecatch && (
                  <img
                    src={post.eyecatch.url}
                    alt={post.title}
                    style={{ maxWidth: "30%", height: "auto" }}
                  />
                )}
              </Link>
            </div>
          )
        )}
      </ul>
    </main>
  );
}
