"use client"
import styles from './Header.module.css'
import Link from "next/link";
import CartIcon from "@/app/Components/Base/CartIcon";
import {DataContext} from "@/app/DataContext";
import {useContext} from "react";
import {DataContextType} from "@/app/types";



export default function Header() {
  const {data} = useContext<DataContextType | null>(DataContext)
  return (
     <header>
         <a href="/" className={styles.logo}>Logo</a>
         <Link href="/cart" className="relative ml-auto mr-5 self-center" aria-label={"Go to Cart"}>
             <span className={styles.indicator} aria-label={"Number of products in cart"}>
                {data.indicator}
             </span>
             <CartIcon strokeWidth={2} classes={"h-8 w-8 text-white"}/>
         </Link>
     </header>
  );
}
