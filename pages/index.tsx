import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Practica 2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.card}>
        <h2>Practica 2</h2>

        <h3>Integrantes</h3>
        <h4>Andres Calvo Ariza</h4>
        <h4>Andres Toloza Guzman</h4>

        <Link href={"/preguntas"} passHref>
          <a className={styles.link}>Ir a Preguntas  </a>
        </Link>
      </div>
    </main>
  );
};

export default Home;
