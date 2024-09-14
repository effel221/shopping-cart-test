import styles from './Product.module.css'
import {ProductType} from "@/app/types";



export default function Product(product:ProductType) {
  const {id, name, price, description} = product
  return (
     <div className={`${styles.product} flex w-full md:w-1/3 lg:w-1/4`} aria-labelledby={id}>
         <div className={styles.productDetails}>
             <h2 id={id}>{name}</h2>
             <p className={styles.price}>{price} €</p>
             <p className={styles.description}>{description}</p>
             <button className="flex ml-auto">Add to Cart</button>
         </div>
     </div>
  );
}
