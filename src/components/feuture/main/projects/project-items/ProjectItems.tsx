import { client } from "@/libs/mcms/client";

export default async function ProjectItems() {
  const data = await client.get({
    endpoint: "blogs",
  });

  console.log(data); // デバッグ用にログ出力

  return (
    <main>
      <ul>
        {data.contents.map((post: { id: string; title: string; content: string; eyecatch?: { url: string } }) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            {post.eyecatch && (
              <img src={post.eyecatch.url} alt={post.title} style={{ maxWidth: "100%", height: "auto" }} />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
