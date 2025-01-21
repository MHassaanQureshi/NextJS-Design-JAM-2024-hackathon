"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  const [shipmentId, setShipmentId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    setShipmentId(uuidv4());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Order Submitted", { ...formData, shipmentId, cart });

    alert("Order placed successfully!");
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>
      <p className="text-sm mb-2">
        Shipment ID: <strong>{shipmentId}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Fields */}
        {["name", "email", "phone", "address", "city", "postalCode", "country"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
