"use client"
import Main from "@/app/Components/Main";
import {cartProducts, deleteProduct, productCountTotal} from "@/app/serverActions";
import {useCallback, useContext, useEffect, useState} from "react";
import {CartProductType, DataContextType} from "@/app/types";
import {DataContext} from "@/app/DataContext";
import CartProduct from "@/app/Components/CartProduct";
import styles from './Cart.module.css'


export default function Cart() {
    const [products, setProducts] = useState<CartProductType[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const {data} = useContext<DataContextType>(DataContext)

    useEffect(()=>{
        cartProducts().then((result)=>{
            setProducts(result)
            const resultTotalPrice = result.reduce((acc, item)=> item.product.price*item.quantity + acc,0)
            setTotalPrice(resultTotalPrice)
        })
    },[])

    const deleteProductClick = useCallback(async (cartId: string, id: string, quantity: number) => {
        const filteredCartProducts = products.filter(elem=>elem.id !== id);
        const item = products.find(elem=>elem.id === id);
        setProducts(filteredCartProducts)
        await deleteProduct(cartId, id)
        const total = await productCountTotal()
        data?.setIndicator(total)
        setTotalPrice((current)=>Number(current - (item?.product?.price || 0) * quantity ))
    },[products, setProducts, data])

    return (
       <Main>
           <h1>Cart</h1>
           <ul className={styles.cardProductList} aria-label={"Product list in the cart"}>
             {products.length > 0 && products.map((item)=><li
                 key={item.id}
                 aria-label={item.product.name}
                 aria-describedby="descriptionId"
                 className={styles.cardProduct}
             >
                 <CartProduct
                    item={item}
                    deleteProductClick={deleteProductClick}
                    setTotalPrice={setTotalPrice}
                 />
             </li>)}
             {products.length === 0 && <>No products in the cart</>}
           </ul>
           <div className="flex">
               <span className="ml-auto mr-4">Total price: <strong>{totalPrice.toFixed(2)} €</strong> </span>
           </div>
       </Main>
    );
}
