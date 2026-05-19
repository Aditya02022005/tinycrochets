"use client";

import { toast } from "sonner";

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import { Heart } from "lucide-react";

import { useCartStore } from "@/store/cartStore";

import { useWishlistStore } from "@/store/wishlistStore";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const addToWishlist =
    useWishlistStore(
      (state) =>
        state.addToWishlist
    );

  const removeFromWishlist =
    useWishlistStore(
      (state) =>
        state.removeFromWishlist
    );

  const wishlist =
    useWishlistStore(
      (state) => state.wishlist
    );

  const isWishlisted =
    wishlist.some(
      (item) => item.id === id
    );

  return (
    <Link href={`/products/${id}`}>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="relative group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition duration-500 cursor-pointer"
      >

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {

            e.preventDefault();

            if (isWishlisted) {

              removeFromWishlist(id);

              toast.success(
                "Removed from wishlist!"
              );

            } else {

              addToWishlist({
                id,
                name,
                price,
                image,
              });

              toast.success(
                "Added to wishlist!"
              );
            }
          }}

          className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
        >

          <Heart
            size={22}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-[#7a4b2a]"
            }
          />
        </button>

        {/* PRODUCT IMAGE */}
        <div className="overflow-hidden">

          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            unoptimized
            className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-2xl font-semibold text-[#7a4b2a]">
              {name}
            </h2>

            <p className="text-[#7a4b2a] font-semibold">
              ₹{price}
            </p>
          </div>

          <p className="text-[#8b6b52] leading-relaxed text-sm mb-6">
            Handmade crochet creation crafted beautifully with love and care.
          </p>

          <button
            onClick={(e) => {

              e.preventDefault();

              addToCart({
                id,
                name,
                price,
                image,
              });

              toast.success(
                "Added to cart!"
              );
            }}

            className="w-full bg-[#7a4b2a] text-white py-3 rounded-full hover:bg-[#5c4033] transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </Link>
  );
}