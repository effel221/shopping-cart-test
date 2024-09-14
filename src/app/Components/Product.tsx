import styles from './Product.module.css'
import {ProductType} from "@/app/types";



export default function Product(product:ProductType) {
  const {name, price, description} = product
  return (
     <div className={`${styles.product} flex basis-1 md:basis-1/3 lg:basis-1/4`} aria-labelledby="productName">
         <div className={styles.productDetails}>
             <h2 id="productName">{name}</h2>
             <p className={styles.price}>{price} €</p>
             <p className={styles.description}>{description}</p>
         </div>
     </div>
  );
}
