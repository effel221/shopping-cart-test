"use server"

import prisma from "@/app/prisma";

export const productCountTotal = async () => {
    const totalProducts = await prisma.cartItems.aggregate({
        _sum: {
            quantity: true,
        },
    })
    return totalProducts._sum.quantity || 0
}

export const updateProduct = async (cartId: string, id: string, quantity: number) => {
    const productUpdate = await prisma.cartItems.update({
        where: {
            cartId,
            id
        },
        data: {
            quantity
        }
    })

    return productUpdate
}

export const cartProducts = async () => {
    const products = await prisma.cartItems.findMany({
        include: {
            product: true
        }
    })
    return products
}

export const deleteProduct = async (cartId: string, id: string) => {
    const removedProduct = await prisma.cartItems.delete({
        where: {
            cartId,
            id: id
        }
    })
    return removedProduct
}


export const addToCard = async (id: string, quantity: number) => {
    const currentCart = await prisma.cart.findMany()
    const data = {
        cartItems: {
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
        const currentProduct = await prisma.cartItems.findMany({
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
           await updateProduct(currentCart[0]?.id, currentProduct[0].id, newQuantity)
        }
    }
}
