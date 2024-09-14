import styles from './Header.module.css'
import Link from "next/link";


export default function Header() {
  return (
     <header>
         <a href="/" className={styles.logo}>Logo</a>
         <Link href="/cart" className="ml-auto mr-4 self-center">Cart</Link>
     </header>
  );
}
