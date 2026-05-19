"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/data/lib/supabase";

import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProductPage() {

  const { id } = useParams();

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function fetchProduct() {

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setName(data.name);
        setPrice(data.price);
        setDescription(
          data.description
        );
      }
    }

    fetchProduct();
  }, [id]);

  async function handleUpdate(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price: Number(price),
        description,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product added!");

      router.push("/admin");
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f3ed] px-6 py-16">

      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10">

        <h1 className="text-5xl font-bold text-[#7a4b2a] mb-10">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full rounded-2xl border border-[#e8ddd2] px-5 py-4 outline-none text-black"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
            className="w-full rounded-2xl border border-[#e8ddd2] px-5 py-4 outline-none text-black"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={5}
            required
            className="w-full rounded-2xl border border-[#e8ddd2] px-5 py-4 outline-none text-black resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition"
          >
            {loading
              ? "Updating..."
              : "Update Product"}
          </button>
        </form>
      </div>
    </main>
  );
}