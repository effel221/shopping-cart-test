"use client"
import styles from './CartProduct.module.css'
import {useContext, useEffect, useState} from "react";
import {updateProduct} from "@/app/serverActions";
import {DataContextType} from "@/app/types";
import {DataContext} from "@/app/DataContext";

export default function CartProduct({item, deleteProductClick}) {
  const [quantity, setQuantity] = useState(item.quantity)
  const {data} = useContext<DataContextType | null>(DataContext)
  const id = item.id
  const addQuantity = async () => {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      data.setIndicator(data.indicator + 1)
  }

  const minusQuantity = async () => {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      data.setIndicator(data.indicator - 1)
  }

  useEffect(()=>{
      updateProduct(item.cartId, id, quantity)
  },[quantity])

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
           onClick={()=>deleteProductClick(item.cartId, item.id)}
           className={styles.deleteButton}
       >x</button></>}
   </>
  );
}
