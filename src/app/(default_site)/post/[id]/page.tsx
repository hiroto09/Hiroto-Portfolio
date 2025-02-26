import Post from "@/components/features/post/Post"
import { client } from "@/libs/mcms/client";

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params }: Params) {
  return <Post id={params.id} />;
}

export const generateStaticParams = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return data.contents.map((post: { id: string }) => ({
    id: post.id,
  }));
};
