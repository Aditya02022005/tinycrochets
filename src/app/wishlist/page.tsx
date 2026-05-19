"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

import { ShoppingBag } from "lucide-react";

import { toast } from "sonner";

import { useWishlistStore } from "@/store/wishlistStore";

import { useCartStore } from "@/store/cartStore";

export default function WishlistPage() {

  const wishlist =
    useWishlistStore(
      (state) => state.wishlist
    );

  const removeFromWishlist =
    useWishlistStore(
      (state) =>
        state.removeFromWishlist
    );

  const addToCart =
    useCartStore(
      (state) => state.addToCart
    );

  return (
    <main className="min-h-screen bg-[#f8f3ed] px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold text-[#7a4b2a] mb-14">
          Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="text-center py-32">

            <h2 className="text-4xl font-bold text-[#7a4b2a] mb-6">
              Your wishlist is empty
            </h2>

            <p className="text-[#7b6a58] text-lg">
              Save beautiful crochet creations here.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {wishlist.map((item) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -8,
                }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg"
              >

                <Link
                  href={`/products/${item.id}`}
                >

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={500}
                    unoptimized
                    className="w-full h-80 object-cover"
                  />
                </Link>

                <div className="p-6">

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-2xl font-semibold text-[#7a4b2a]">
                      {item.name}
                    </h2>

                    <p className="text-[#7a4b2a] font-semibold">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex gap-4">

                    <button
                      onClick={() => {

                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        });

                        toast.success(
                          "Added to cart!"
                        );
                      }}

                      className="flex-1 bg-[#7a4b2a] text-white py-3 rounded-full hover:bg-[#5c4033] transition flex items-center justify-center gap-2"
                    >

                      <ShoppingBag
                        size={18}
                      />

                      Add to Cart
                    </button>

                    <button
                      onClick={() => {

                        removeFromWishlist(
                          item.id
                        );

                        toast.success(
                          "Removed from wishlist!"
                        );
                      }}

                      className="px-5 py-3 rounded-full bg-[#e7ddd2] text-[#7a4b2a] hover:bg-[#d8c8b7] transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}