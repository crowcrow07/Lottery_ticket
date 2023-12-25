import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.banner}>
        <div className={styles.lnb}>
          <a href="#none">제작자의 깃허브</a>
          <a href="#none">제작자의 블로그</a>
          {/* <a href="#none">제작자의 인스타</a> */}
        </div>
      </div>
    </header>
  );
}
