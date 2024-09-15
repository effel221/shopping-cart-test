"use client"
import styles from './Product.module.css'
import {ProductType} from "@/app/types";
import {addToCard, productCountTotal} from "@/app/serverActions";
import {useCallback, useContext} from "react";
import {DataContext} from "@/app/DataContext";

export default function Product(product:ProductType) {
  const {id, name, price, description} = product
  const {data} = useContext(DataContext)

  const addToCardClick = useCallback(async () => {
      await addToCard(id, 1)
      const total = await productCountTotal()
      data.setIndicator(total)
  },[id, data])

  return (
     <div className={`${styles.product} flex w-full md:w-1/3 lg:w-1/4`}
          aria-label={name} aria-describedby="descriptionId"
     >
         <div className={styles.productDetails}>
             <h2>{name}</h2>
             <p className={styles.price}>{price} €</p>
             <p id="descriptionId" className={styles.description}>{description}</p>
             <button
                 className="flex ml-auto"
                 onClick={addToCardClick}
             >Add to Cart</button>
         </div>
     </div>
  );
}
