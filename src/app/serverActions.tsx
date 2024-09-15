"use server"

import prisma from "@/app/prisma";
import {ProductType} from "@/app/types";

export const addToCard = async (product: ProductType, quantity: number) => {
    "use server"
    const result = await prisma.cart.create({
        data: {
            cartItem: {
                create: {
                    product: {
                        connect: {id: product.id}
                    },
                    quantity: quantity
                }
            }
        }
    })
    return result
}
