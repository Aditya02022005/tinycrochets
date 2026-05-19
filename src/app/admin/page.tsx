"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/data/lib/supabase";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  async function fetchProducts() {

    const { data } = await supabase
      .from("products")
      .select("*");

    setProducts(data || []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(
    id: number
  ) {

    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
     toast.error(error.message);
    } else {

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== id
        )
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f3ed] p-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <h1 className="text-5xl font-bold text-[#7a4b2a] mb-10">
          Admin Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* ADD PRODUCT */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-[#7a4b2a] mb-4">
              Add Products
            </h2>

            <p className="text-[#7b6a58] mb-6">
              Create and upload new crochet products.
            </p>

            <a
              href="/admin/add-product"
              className="inline-block bg-[#7a4b2a] text-white px-6 py-3 rounded-full hover:bg-[#5c4033] transition"
            >
              Add Product
            </a>
          </div>

          {/* ORDERS */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-[#7a4b2a] mb-4">
              Orders
            </h2>

            <p className="text-[#7b6a58] mb-6">
              Manage customer orders and payments.
            </p>

            <button className="bg-[#e7ddd2] text-[#7a4b2a] px-6 py-3 rounded-full">
              Coming Soon
            </button>
          </div>
        </div>

        {/* MANAGE PRODUCTS */}
        <div>

          <h2 className="text-4xl font-bold text-[#7a4b2a] mb-10">
            Manage Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-[#eee]"
              >

                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  unoptimized
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-[#7a4b2a] mb-3">
                    {product.name}
                  </h3>

                  <p className="text-[#5c4033] text-lg font-semibold mb-6">
                    ₹{product.price}
                  </p>
                  <Link
  href={`/admin/edit-product/${product.id}`}
  className="w-full block text-center bg-[#7a4b2a] text-white py-3 rounded-full hover:bg-[#5c4033] transition mb-4"
>
  Edit Product
</Link>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="w-full bg-[#c97b63] text-white py-3 rounded-full hover:bg-[#b8654c] transition"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}