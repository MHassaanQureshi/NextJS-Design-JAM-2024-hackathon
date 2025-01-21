"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function ProductClientComponent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState("");

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); 
  };

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.title} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
      
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <Image
        src={product.image_url}
        alt={product.title}
        width={300}
        height={200}
        className="w-full h-96 object-contain"
      />
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-700 mt-4">{product.description}</p>
        <div className="text-lg font-bold mt-4">Price: ${product.price}</div>
       
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <p>in stock : {product.inventory}</p>
      </div>
    </div>
  );
}
