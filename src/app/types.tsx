import {ReactNode} from "react";

export type ChildrenProps = {
    children: ReactNode | undefined
}

export type ProductType = {
    id: string,
    name: string,
    price: number,
    description: string
}

export type CartIconProps = {
    classes: string,
    strokeWidth: number
}

export type CartProductType = {
    id: string,
    cartId: string,
    quantity: number,
    product: ProductType
}
