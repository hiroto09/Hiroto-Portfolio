import { client } from "@/libs/mcms/client";
import Post from "@/components/features/post/Post";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const data = await client.get({ endpoint: "blogs", queries: { fields: "id", limit: 100 } });

  return data.contents.map((post: { id: string }) => ({
    id: post.id, 
  }));
}

export default async function Page({ params }: Props) {
  const post = await client.get({
    endpoint: "blogs",
    contentId: params.id,
  });

  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return <Post post={post} />;
}
