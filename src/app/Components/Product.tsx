"use client"
import styles from './Product.module.css'
import {ProductType} from "@/app/types";
import {addToCard} from "@/app/serverActions";

export default function Product(product:ProductType) {
  const {id, name, price, description} = product

  const addToCardClick = () => {
      addToCard(product, 1)
  }
  return (
     <div className={`${styles.product} flex w-full md:w-1/3 lg:w-1/4`} aria-labelledby={id}>
         <div className={styles.productDetails}>
             <h2 id={id}>{name}</h2>
             <p className={styles.price}>{price} €</p>
             <p className={styles.description}>{description}</p>
             <button
                 className="flex ml-auto"
                 onClick={addToCardClick}
             >Add to Cart</button>
         </div>
     </div>
  );
}
