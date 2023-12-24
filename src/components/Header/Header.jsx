import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.banner}>
        <div className={styles.lnb}>
          <a href="#none">깃허브</a>
          <a href="#none">기술 블로그</a>
          <a href="#none">인스타?</a>
        </div>
      </div>
      <nav>
        <span>나는 복권 1등할려면 몇장을 샀어야했나</span>
      </nav>
    </header>
  );
}