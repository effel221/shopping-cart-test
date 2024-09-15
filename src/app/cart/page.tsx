"use client"
import Main from "@/app/Components/Main";
import {cartProducts, deleteProduct} from "@/app/serverActions";
import {useEffect, useState} from "react";
import {CartProductType} from "@/app/types";


export default function Cart() {
    const [products, setProducts] = useState<CartProductType[] | []>([])

    useEffect(()=>{
        cartProducts().then((result: CartProductType[])=>{
            setProducts(result)
        })
    },[])

    const deleteProductClick = async (id: string) => {
       await deleteProduct(id)
    }

    return (
       <Main>
           <h1>Cart</h1>
           <ul>
             {products.length > 0 && products.map((item)=><li key={item.id}>
                 <p>{item.quantity}</p>
                 {item.product.name}<br/>
                 {item.product.description}<br/>
                 {item.product.price * item.quantity}<br/>
                 <button
                     aria-label={"Delete product"}
                     onClick={()=>deleteProductClick(item.product.id)}
                 >x</button>
             </li>)}
           </ul>
       </Main>
    );
}
