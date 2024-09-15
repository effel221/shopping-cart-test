"use client"
import styles from './CartProduct.module.css'
import {useCallback, useContext, useEffect, useState} from "react";
import {updateProduct} from "@/app/serverActions";
import {CartProductPropsType, DataContextType} from "@/app/types";
import {DataContext} from "@/app/DataContext";

export default function CartProduct({item, deleteProductClick}:CartProductPropsType) {
  const [quantity, setQuantity] = useState(item.quantity)
  const {data} = useContext<DataContextType>(DataContext)

  const addQuantity = useCallback(async () => {
          const newQuantity = quantity + 1
          setQuantity(newQuantity)
          data?.setIndicator(data?.indicator + 1)
      },[quantity,setQuantity, data ])

  const minusQuantity = useCallback(async () => {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      data?.setIndicator(data?.indicator - 1)
  },[quantity,setQuantity, data ])

  useEffect(()=>{
      updateProduct(item.cartId, item.id, quantity)
  },[quantity, item.cartId, item.id])

  return (
   <>
       {item && <><h2>{item.product.name}</h2>
       <p id="descriptionId" className={styles.description}>{item.product.description}</p>
       <div className="flex w-full">
           <span>Amount: <button disabled={quantity===1} onClick={minusQuantity}>-</button>
             <strong> {quantity} </strong> <button onClick={addQuantity}>+</button>
           </span>
           <span className={styles.price}>{(item.product.price * quantity).toFixed(2)} € </span>
       </div>
       <button
           aria-label={"Delete product"}
           onClick={()=>deleteProductClick(item?.cartId, item.id)}
           className={styles.deleteButton}
       >x</button></>}
   </>
  );
}
