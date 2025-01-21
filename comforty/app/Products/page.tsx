
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import Image from "next/image";
import Newsletter from "../components/Newsletter/Newsletter";

import Link from "next/link";
const getProducts = async () => {
  const products = await client.fetch(
    `
    *[_type == "products"]{
      _id,
      title,
      description,
      inventory,
      price,
      priceWithoutDiscount,
      tags,
      badge,
      "image_url": image.asset->url
    }
    `
  );
  return products;
};

export default async function Products() {
  
  const products = await getProducts();

  return (
    <div className="w-full items-center flex flex-col p-2 mt-10">
      <h1 className="text-2xl font-bold p-2">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product: Product) => (
          <div key={product._id} className="flex flex-col w-full">
           
            <div className="relative">
              <span className="absolute bg-[#F5813F] p-1 text-white ml-2 mt-4 text-sm rounded-lg">
                Sale
              </span>
            
              <Link href={`/product/${product._id}`}>
              <Image
                src={product.image_url}
                alt={product.title || "Product Image"}
                width={250}
                height={100}
                className="hover:scale-105 transition-transform duration-500"
              />
              </Link>
            </div>

           
            <div className="flex flex-col mt-2">
              <h1 className="font-bold text-lg">{product.title}</h1>
              <span className="flex justify-between p-2 items-center">
              
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold">${product.price}</p>
                  <p className="line-through text-[#9A9CAA] text-sm">
                    ${product.priceWithoutDiscount}
                  </p>
                 
                </div>
                
                {/* <button className="hover:bg-[#029FAE] rounded-lg p-2" onClick={() => addToCart(product)}>
                  <Image
                    src="/images/cart.png"
                    alt="Add to cart"
                    width={20}
                    height={20}
                  />
                </button> */}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-baseline bg-[#1E2832] bg-opacity-10">
        <Newsletter/>
      </div>
    </div>
  );
}
