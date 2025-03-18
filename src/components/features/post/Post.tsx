import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/libs/mcms/client';
import PostLayout from '@/components/layouts/post/PostLayout';
import style from './Post.module.scss';
import Image from 'next/image';

interface PostProps {
  post: PostType;
}

interface PostType {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
}

export default function Post({ post }: PostProps) {
  if (!post) {
    return <div>Loading...</div>; // 事前生成されていない場合
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
