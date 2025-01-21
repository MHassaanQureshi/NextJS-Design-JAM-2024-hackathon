import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/types/product";
import { client } from "@/sanity/lib/client"; 
import { notFound } from "next/navigation";


interface PageProps {
  params: {
    id: string;
  };
}


async function fetchProduct(id: string): Promise<Product | null> {
  try {
    
    const product = await client.fetch(
      `*[_type == "products" && _id == $productId][0]{
        _id,
        title,
        description,
        price,
        inventory,
        "image_url": image.asset->url
      }`,
      { productId: id } 
    );

    return product || null; 
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; 
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params; 
  
  const product = await fetchProduct(id);

  if (!product) {
    notFound(); 
    return null;
  }

  
  return <ProductClientComponent product={product} />;
}
