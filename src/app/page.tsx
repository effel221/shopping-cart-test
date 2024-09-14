import Main from "@/app/Components/Main";
import prisma from "@/app/prisma";
import Product from "@/app/Components/Product";
import {ProductType} from "@/app/types";



export default async function Home() {
  const products = JSON.parse(JSON.stringify(await prisma.product.findMany()))
  return (
      <Main>
          <h1>Product list</h1>
          <div className="container">
              <div className="flex flex-col md:flex-row">{products.map((product:ProductType)=>
                  <Product key={product.id} {...product}/>
              )}
              </div>
          </div>
      </Main>
  );
}
