"use server"

import prisma from "@/app/prisma";

export const updateProduct = async (cartId: string, productId: string, quantity: number) => {
    const productUpdate = await prisma.cartItem.update({
        where: {
            cartId,
            productId
        },
        data: {
            quantity
        }
    })

    return productUpdate
}

export const addToCard = async (id: string, quantity: number) => {
    const currentCart = await prisma.cart.findMany()
    const data = {
        cartItem: {
            create: {
                product: {
                    connect: {id}
                },
                quantity: quantity
            }
        }
    }

    if (!currentCart[0]?.id) {
        const addToCart = await prisma.cart.create({
            data
        })
        return addToCart
    } else {
        const currentProduct = await prisma.cartItem.findMany({
            where: {
                cartId: currentCart[0].id,
                productId: id
            }
        })

        if (currentProduct.length === 0) {
            const updateToCard = await prisma.cart.update({
                where: {
                    id: currentCart[0]?.id
                },
                data
            })
            return updateToCard
        } else {
           const newQuantity = ++currentProduct[0].quantity
           await updateProduct(currentCart[0]?.id, id, newQuantity)
        }
    }
}
