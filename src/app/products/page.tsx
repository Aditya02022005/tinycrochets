"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import { supabase } from "@/data/lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);
    const [loading, setLoading] =
  useState(true);
    const [search, setSearch] =
  useState("");

  useEffect(() => {

    async function fetchProducts() {
      setLoading(true);

    let query = supabase
  .from("products")
  .select("*");

if (search) {
  query = query.ilike(
    "name",
    `%${search}%`
  );
}

const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    }

    fetchProducts();
  }, [search]);

  return (
    <main className="bg-[#f8f3ed] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-[#f3e7da] to-[#f8f3ed]" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >

          <p className="uppercase tracking-[0.4em] text-[#a07a5a] mb-6">
            TinyCrochets Collection
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-[#7a4b2a] leading-tight mb-8">
            Handmade
            <br />
            Elegance
          </h1>

          <p className="max-w-2xl mx-auto text-[#6d5a4d] text-lg leading-relaxed">
            Explore beautifully handcrafted
            crochet flowers, bouquets and
            timeless creations made with
            love and detail.
          </p>
          <div className="max-w-2xl mx-auto mt-12">

  <input
    type="text"
    placeholder="Search crochet creations..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-8 py-5 text-lg outline-none text-[#5c4033] placeholder:text-[#9a8775]"
  />
</div>
        </motion.div>

        {/* BLOBS */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c89b74]/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7a4b2a]/10 rounded-full blur-3xl"></div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
        

       {loading ? (

  [...Array(4)].map((_, index) => (

    <div
      key={index}
      className="grid md:grid-cols-2 gap-16 items-center animate-pulse"
    >

      {/* IMAGE SKELETON */}
      <div className="h-[650px] rounded-[3rem] bg-[#e7ddd2]"></div>

      {/* CONTENT SKELETON */}
      <div className="space-y-6">

        <div className="h-5 w-40 rounded-full bg-[#e7ddd2]"></div>

        <div className="h-20 w-full rounded-3xl bg-[#e7ddd2]"></div>

        <div className="h-32 w-full rounded-3xl bg-[#e7ddd2]"></div>

        <div className="h-10 w-40 rounded-full bg-[#e7ddd2]"></div>

        <div className="h-14 w-52 rounded-full bg-[#e7ddd2]"></div>
      </div>
    </div>
  ))

) : (

  products.map((product, index) => (

          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 120,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-16 items-center

            ${
              index % 2 !== 0
                ? "md:[&>*:first-child]:order-2"
                : ""
            }`}
          >

            {/* IMAGE */}
            <motion.div
              whileHover={{
                scale: 1.03,
                rotate: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              className="relative group"
            >

              <div className="absolute inset-0 bg-[#7a4b2a]/10 rounded-[3rem] blur-2xl scale-95 group-hover:scale-100 transition duration-500"></div>

              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">

                <Image
                  src={product.image}
                  alt={product.name}
                  width={900}
                  height={900}
                  unoptimized
                  className="w-full h-[650px] object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{
                opacity: 0,
                x: 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              viewport={{ once: true }}
            >

              <p className="uppercase tracking-[0.3em] text-[#a07a5a] mb-5">
                Handmade Crochet
              </p>

              <h2 className="text-5xl md:text-6xl font-bold text-[#7a4b2a] mb-8 leading-tight">
                {product.name}
              </h2>

              <p className="text-[#6d5a4d] text-lg leading-relaxed mb-10">
                {product.description}
              </p>

              <p className="text-4xl font-semibold text-[#5c4033] mb-10">
                ₹{product.price}
              </p>

              <Link
                href={`/products/${product.id}`}
                className="inline-flex items-center gap-3 bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition duration-300 text-lg shadow-lg hover:scale-105"
              >
                View Product
              </Link>
            </motion.div>
          </motion.div>
        ))
)}
      </section>
    </main>
  );
}