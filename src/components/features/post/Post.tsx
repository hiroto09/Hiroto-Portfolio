"use client"; // 追加
import { useEffect, useState } from "react";
import { client } from "@/libs/mcms/client";
import PostLayout from "@/components/layouts/post/PostLayout";
import style from "./Post.module.scss";
import Image from "next/image";

interface PostProps {
  id: string;
}

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
}

export default function Post({ id }: PostProps) {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await client.get({
        endpoint: "blogs",
        queries: { limit: 100 },
      });
      const foundPost = data.contents.find(
        (post: PostType) => post.id === String(id)
      );
      setPost(foundPost || null);
    }
    fetchData();
  }, [id]);

  if (!post) {
    return <div></div>;
  }

  return (
    <PostLayout>
      <div className={style.post}>
        <h1 className={style.title}>{post.title}</h1>
        {post.eyecatch && (
          <div className={style.eyecatch}>
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={800}
              height={400}
              layout="responsive"
            />
          </div>
        )}
        <div
          className={style.text}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </PostLayout>
  );
}
