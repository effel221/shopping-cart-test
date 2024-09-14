import styles from './Header.module.css'

export default function Header() {
  return (
     <header>
         <a href="/" className={styles.logo}>Logo</a>
     </header>
  );
}
