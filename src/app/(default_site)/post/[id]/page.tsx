import { client } from '@/libs/mcms/client';

interface Params {
  params: {
    id: string;
  };
}

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
  };
}

const Post = async ({ params }: Params) => {
  const { id } = params; // URL パラメータから ID を取得
  const data = await client.get({
    endpoint: "blogs",
  });

  // 型を指定
  const post: PostType | undefined = data.contents.find((post: PostType) => post.id === id);

  if (!post) {
    return <div>投稿が見つかりませんでした。</div>; // 投稿が見つからない場合の処理
  }

  return (
    <main>
      <h3>{post.title}</h3>
      {post.eyecatch && (
        <img src={post.eyecatch.url} alt={post.title} style={{ maxWidth: "100%", height: "auto" }} />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
};

// params の型を定義
export const generateStaticParams = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return data.contents.map((post: PostType) => ({
    id: post.id,
  }));
};

export default Post;
