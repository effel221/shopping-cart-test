import styles from './Product.module.css'
import {ProductType} from "@/app/types";



export default function Product(product:ProductType) {
  const {name, price, description} = product
  return (
     <div className={`${styles.product} w-full md:w-1/3 lg:w-1/4`}>
        <h2>{name}</h2>
        <p className="price">{price.toString()}</p>
        <p className="description">{description}</p>
     </div>
  );
}
