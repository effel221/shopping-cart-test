import Main from "@/app/Components/Main";
import prisma from "@/app/prisma";


export default async function Home() {
  const products = await prisma.product.findMany()
  return (
      <Main>
          <h1>Product list</h1>
          {products.map(({id, name, price, description})=><div key={id}>
              <h3>{name}</h3>
              <p>{price}</p>
              <p>{description}</p>
          </div>)}
      </Main>
  );
}
