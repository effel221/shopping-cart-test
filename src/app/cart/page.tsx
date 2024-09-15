"use client"
import Main from "@/app/Components/Main";
import {cartProducts, deleteProduct, productCountTotal} from "@/app/serverActions";
import {useContext, useEffect, useState} from "react";
import {CartProductType, DataContextType} from "@/app/types";
import {DataContext} from "@/app/DataContext";
import CartProduct from "@/app/Components/CartProduct";
import styles from './Cart.module.css'


export default function Cart() {
    const [products, setProducts] = useState<CartProductType[] | []>([])
    const {data} = useContext<DataContextType | null>(DataContext)

    useEffect(()=>{
        cartProducts().then((result: CartProductType[])=>{
            setProducts(result)
        })
    },[])

    const deleteProductClick = async (cartId: string, id: string) => {
       const filteredCartProducts = products.filter(elem=>elem.id !== id);
       setProducts(filteredCartProducts)
       await deleteProduct(cartId, id)
       const total = await productCountTotal()
       data.setIndicator(total)
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
                 <CartProduct
                    item={item}
                    deleteProductClick={deleteProductClick}
                 />
             </li>)}
           </ul>
       </Main>
    );
}
