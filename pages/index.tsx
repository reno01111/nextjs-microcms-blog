import { GetStaticProps } from "next";
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

type Blog = {
  id: string;
  title: string;
};

type HomeProps = {
  blog: Blog[];
};

export default function Home({ blog }: HomeProps) {
  return (
    <div className={styles.container}>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
