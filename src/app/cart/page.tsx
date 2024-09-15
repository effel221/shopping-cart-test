"use client"
import Main from "@/app/Components/Main";
import {cartProducts, deleteProduct} from "@/app/serverActions";
import {useEffect, useState} from "react";
import {CartProductType} from "@/app/types";
import styles from './CartProduct.module.css'


export default function Cart() {
    const [products, setProducts] = useState<CartProductType[] | []>([])

    useEffect(()=>{
        cartProducts().then((result: CartProductType[])=>{
            setProducts(result)
        })
    },[])

    const deleteProductClick = async (id: string) => {
       const filteredCartProducts = products.filter(elem=>elem.id !== id);
       setProducts(filteredCartProducts)
       await deleteProduct(id)
    }

    return (
       <Main>
           <h1>Cart</h1>
           <ul aria-label={"Product list in the cart"}>
             {products.length > 0 && products.map((item)=><li
                 key={item.id}
                 aria-label={item.product.name}
                 aria-describedby="descriptionId"
                 className={styles.cardProduct}
             >
                 <h2>{item.product.name}</h2>
                 <p id="descriptionId" className={styles.description}>{item.product.description}</p>
                 <div className="flex w-full">
                     <span>Amount: {item.quantity}</span>
                     <span className={styles.price}>{item.product.price * item.quantity} € </span>
                 </div>
                 <button
                     aria-label={"Delete product"}
                     onClick={()=>deleteProductClick(item.id)}
                     className={styles.deleteButton}
                 >x</button>
             </li>)}
           </ul>
       </Main>
    );
}
