"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/data/lib/supabase";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
  (state) => state.removeFromCart
);
const [user, setUser] =
  useState<User | null>(null);

const router = useRouter();

const increaseQuantity =
  useCartStore(
    (state) =>
      state.increaseQuantity
  );

const decreaseQuantity =
  useCartStore(
    (state) =>
      state.decreaseQuantity
  );
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  useEffect(() => {

  supabase.auth
    .getUser()
    .then(({ data }) => {
      setUser(data.user);
    });

}, []);
function handleWhatsAppOrder() {

  if (!user) {

    toast.error(
      "Please login first"
    );

    router.push("/login");

    return;
  }

  const message = cart
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - ₹${item.price}`
    )
    .join("\n");

  const finalMessage =
    `Hi TinyCrochets,%0A%0A` +
    `I want to order:%0A%0A` +
    `${message}%0A%0A` +
    `Total: ₹${total}`;

  window.open(
    `https://wa.me/919870437123?text=${finalMessage}`,
    "_blank"
  );
}

  return (
    <main className="min-h-screen bg-[#f8f3ed] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-[#7a4b2a] mb-12">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-xl text-[#5c4033]">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 flex items-center gap-6 shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#7a4b2a]">
                    {item.name}
                  </h2>

                  <p className="text-[#5c4033] mt-2">
                    ₹{item.price}
                  </p>
                </div>
               <div className="flex items-center gap-3">

  <button
    onClick={() =>
      decreaseQuantity(item.id)
    }
    className="w-10 h-10 rounded-full bg-[#e7ddd2] text-[#7a4b2a] text-xl font-bold hover:bg-[#d8c8b7] transition"
  >
    -
  </button>

  <span className="text-xl font-semibold text-[#7a4b2a]">
    {item.quantity}
  </span>

  <button
    onClick={() =>
      increaseQuantity(item.id)
    }
    className="w-10 h-10 rounded-full bg-[#7a4b2a] text-white text-xl font-bold hover:bg-[#5c4033] transition"
  >
    +
  </button>

  <button
    onClick={() =>
      removeFromCart(item.id)
    }
    className="bg-[#c97b63] text-white px-5 py-2 rounded-full hover:bg-[#b8654c] transition duration-300 text-sm font-semibold shadow-md ml-4"
  >
    Remove
  </button>

</div>
              </div>
              
            ))}

            <div className="bg-white rounded-3xl p-8 shadow-md mt-10">
              <h2 className="text-3xl font-bold text-[#7a4b2a] mb-4">
                Total: ₹{total}
              </h2>

              <button
  onClick={handleWhatsAppOrder}
  className="bg-[#25D366] text-white px-8 py-4 rounded-full hover:opacity-90 transition w-full text-lg font-semibold"
>
  Order on WhatsApp
</button>
            </div>
          </div>
        )}
      </div>
      
    </main>
  );
}