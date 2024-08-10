import { GetStaticProps, GetStaticPaths } from "next";
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

// SSG
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: { id: string }) => ({
    params: { id: content.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

type BlogProps = {
  blog: {
    title: string;
    publishedAt: string;
    body: string;
  };
};

export default function BlogId({ blog }: BlogProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
      />
      <Link href='/'></Link>
    </main>
  );
}
