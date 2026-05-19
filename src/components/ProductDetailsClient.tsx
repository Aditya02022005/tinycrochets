"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <main className="min-h-screen bg-[#f8f3ed] px-6 py-20">
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="relative h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-[#7a4b2a] mb-6">
            {product.name}
          </h1>

          <p className="text-3xl text-[#5c4033] mb-8">
            ₹{product.price}
          </p>

          <p className="text-[#7b6a58] leading-relaxed text-lg mb-10">
            {product.description}
          </p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition text-lg w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}