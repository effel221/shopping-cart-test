import styles from './Header.module.css'
import Link from "next/link";
import CartIcon from "@/app/Components/Base/CartIcon";
import {productCountTotal} from "@/app/serverActions";



export default async function Header() {

  return (
     <header>
         <a href="/" className={styles.logo}>Logo</a>
         <Link href="/cart" className="relative ml-auto mr-5 self-center" aria-label={"Go to Cart"}>
             <span className={styles.indicator}>{await productCountTotal()}</span>
             <CartIcon strokeWidth={2} classes={"h-8 w-8 text-white"}/>
         </Link>
     </header>
  );
}
