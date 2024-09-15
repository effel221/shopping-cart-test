"use client"
import {createContext, useEffect, useState} from 'react'
import {productCountTotal} from "@/app/serverActions";
import {ChildrenProps, DataContextType} from "@/app/types";


export const DataContext = createContext<DataContextType | null>(null)

const DataProvider = ({ children }:ChildrenProps) => {
    const [indicator, setIndicator] = useState<number>(0)
    const data = {
        indicator,
        setIndicator
    }
    useEffect(()=>{
        productCountTotal().then((result: number)=>{
            setIndicator(result)
        })
    },[])

    return (
        <DataContext.Provider value={{ data }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataProvider;
