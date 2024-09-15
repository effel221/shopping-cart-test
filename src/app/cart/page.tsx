import Main from "@/app/Components/Main";
import prisma from "@/app/prisma";


export default async function Cart() {
    const products = await prisma.cart.findMany({
        include: {
            cartItem: {
                include: {
                    product: true
                }
            }
        }
    })
    console.log(JSON.stringify(products))
  return (
     <Main>
         <h1>Cart</h1>
     </Main>
  );
}
