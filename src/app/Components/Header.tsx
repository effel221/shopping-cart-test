import styles from './Header.module.css'
import Link from "next/link";
import CartIcon from "@/app/Components/Base/CartIcon";



export default function Header() {
  return (
     <header>
         <a href="/" className={styles.logo}>Logo</a>
         <Link href="/cart" className="ml-auto mr-4 self-center">
             <CartIcon strokeWidth={2} classes={"h-8 w-8 text-white"}/>
         </Link>
     </header>
  );
}
