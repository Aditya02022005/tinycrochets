"use client";

import { useState } from "react";
import { supabase } from "@/data/lib/supabase";
import { toast } from "sonner";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  
const [imageFile, setImageFile] =
  useState<File | null>(null);
  const [description, setDescription] =
    useState("");
    const [category, setCategory] =
  useState("");
  const [loading, setLoading] =
    useState(false);
    async function uploadImage() {
  if (!imageFile) return null;

  const fileName = `${Date.now()}-${imageFile.name}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, imageFile);

  if (error) {
    toast.error(error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrl;
}

  async function handleAddProduct(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    const uploadedImage =
  await uploadImage();

if (!uploadedImage) {
  setLoading(false);
  return;
}

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: Number(price),
          image: uploadedImage,
          description,
category,
        },
      ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product added!");

      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f3ed] px-6 py-16">

      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10">

        <h1 className="text-5xl font-bold text-[#7a4b2a] mb-10">
          Add Product
        </h1>

        <form
          onSubmit={handleAddProduct}
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
            className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none focus:border-[#7a4b2a] text-black"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
            className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none focus:border-[#7a4b2a] text-black"
          />

          <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImageFile(
      e.target.files?.[0] || null
    )
  }
  required
  className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none text-black"
/>
<select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  required
  className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none text-black"
>

  <option value="">
    Select Category
  </option>

  <option value="Flowers">
    Flowers
  </option>

  <option value="Bouquets">
    Bouquets
  </option>

  <option value="Accessories">
    Accessories
  </option>

  <option value="Gifts">
    Gifts
  </option>

</select>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={5}
            required
            className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none focus:border-[#7a4b2a] text-black resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}