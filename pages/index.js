import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>recipes for brewing the perfect cup of coffee</h1>
        <img src="/assets/images/Logo.svg" alt="coffee cup logo" className={styles.logo} />
        <Link href="/brewMethods">
          <a className={styles.button}>
            <span>start brewing</span>
            <img src="/assets/images/arrow.svg" alt="chevron right" />
          </a>
        </Link>
      </main>
    </div>
  );
}
