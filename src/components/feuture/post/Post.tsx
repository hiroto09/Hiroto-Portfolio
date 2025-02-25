import { client } from "@/libs/mcms/client";
import PostLayout from "@/components/layouts/post/PostLayout";
import style from "./Post.module.scss";

interface PostProps {
  id: string;
}

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
  };
}

export default async function Post({ id }: PostProps): Promise<JSX.Element> {
  const data = await client.get({ endpoint: "blogs" });

  const post: PostType | undefined = data.contents.find(
    (post: PostType) => post.id === id
  );

  if (!post) {
    return <div>投稿が見つかりませんでした。</div>;
  }

  return (
    <PostLayout>
      <div className={style.post}>
      <h1 className={style.title}>{post.title}</h1>
        {post.eyecatch && (
          <div className={style.eyecatch}>
            <img
              src={post.eyecatch.url}
              alt={post.title}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        <div className={style.text} dangerouslySetInnerHTML={{ __html: post.content }} />

      </div>
    </PostLayout>
  );
}
