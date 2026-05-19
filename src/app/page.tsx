"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

import { supabase } from "@/data/lib/supabase";

import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");
    const [selectedCategory,
setSelectedCategory] =
  useState("All");

  useEffect(() => {
    async function fetchProducts() {

      let query = supabase
        .from("products")
        .select("*");

      if (
  selectedCategory !== "All"
) {
  query = query.eq(
    "category",
    selectedCategory
  );
}

if (search) {
  query = query.ilike(
    "name",
    `%${search}%`
  );
}

      const { data } = await query;

      setProducts((data || []).slice(0, 6));
    }

    fetchProducts();
  }, [search, selectedCategory]);

  return (
    <main className="bg-[#f8f3ed] min-h-screen">

      <Hero />

      <section id="best-sellers" className="bg-white rounded-t-[3rem] -mt-10 relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20 shadow-xl">

        <h2 className="text-5xl font-bold text-center text-[#7a4b2a] mb-14">
          Best Sellers
        </h2>

        {/* SEARCH BAR */}
        <SearchBar
        
          search={search}
          setSearch={setSearch}
        />
<div className="flex flex-wrap justify-center gap-4 mb-14">

  {[
    "All",
    "Flowers",
    "Bouquets",
    "Accessories",
    "Gifts",
  ].map((category) => (

    <button
      key={category}
      onClick={() =>
        setSelectedCategory(category)
      }
      className={`px-6 py-3 rounded-full transition font-medium

      ${
        selectedCategory === category
          ? "bg-[#7a4b2a] text-white"
          : "bg-[#f8f3ed] text-[#7a4b2a]"
      }`}
    >
      {category}
    </button>
  ))}
</div>
        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}