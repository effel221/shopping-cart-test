import Main from "@/app/Components/Main";
import prisma from "@/app/prisma";


export default async function Cart() {
    const products = await prisma.cartItems.findMany()

  return (
     <Main>
         <h1>Cart</h1>
     </Main>
  );
}
