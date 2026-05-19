"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { motion } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import { Star } from "lucide-react";

import { toast } from "sonner";

import { supabase } from "@/data/lib/supabase";

import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

export default function ProductDetailsPage() {

  const { id } = useParams();

  const addToCart =
    useCartStore(
      (state) => state.addToCart
    );

  const [product, setProduct] =
    useState<Product | null>(null);

  const [relatedProducts,
  setRelatedProducts] =
    useState<Product[]>([]);

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [reviewName,
  setReviewName] =
    useState("");

  const [reviewComment,
  setReviewComment] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {

    async function fetchProduct() {

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      setProduct(data);

      if (data?.category) {

        const {
          data: related,
        } = await supabase
          .from("products")
          .select("*")
          .eq(
            "category",
            data.category
          )
          .neq("id", data.id)
          .limit(3);

        setRelatedProducts(
          related || []
        );
      }

      const {
        data: reviewsData,
      } = await supabase
        .from("reviews")
        .select("*")
        .eq(
          "product_id",
          data?.id
        )
        .order("created_at", {
          ascending: false,
        });

      setReviews(
        reviewsData || []
      );
    }

    fetchProduct();
  }, [id]);

  if (!product) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8f3ed]">

        <h1 className="text-4xl font-bold text-[#7a4b2a]">
          Loading...
        </h1>
      </main>
    );
  }

  function handleAddToCart() {

    if (!product) return;

    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    toast.success(
      "Added to cart!"
    );
  }

  async function handleReviewSubmit() {

    if (
      !reviewName ||
      !reviewComment
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    const { error } =
      await supabase
        .from("reviews")
        .insert([
          {
            product_id:
              product?.id,
            name: reviewName,
            rating,
            comment:
              reviewComment,
          },
        ]);

    if (error) {

      toast.error(
        "Failed to add review"
      );

      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName,
      rating,
      comment: reviewComment,
    };

    setReviews([
      newReview,
      ...reviews,
    ]);

    setReviewName("");
    setReviewComment("");
    setRating(5);

    toast.success(
      "Review added!"
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3ed] overflow-hidden">

      {/* BLOBS */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-[#c89b74]/20 rounded-full blur-3xl"></div>

      <div className="fixed bottom-10 right-10 w-[30rem] h-[30rem] bg-[#7a4b2a]/10 rounded-full blur-3xl"></div>

      {/* PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-20 items-center relative z-10">

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          whileHover={{
            scale: 1.02,
            rotate: 1,
          }}
          className="relative group"
        >

          <div className="absolute inset-0 bg-[#7a4b2a]/10 blur-3xl rounded-[3rem] scale-95 group-hover:scale-100 transition duration-500"></div>

          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">

            <Image
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              unoptimized
              className="w-full h-[750px] object-cover group-hover:scale-110 transition duration-700"
            />
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <span className="inline-block bg-white/70 backdrop-blur-xl border border-white/40 shadow-md text-[#7a4b2a] px-5 py-2 rounded-full mb-6">
            {product.category}
          </span>

          <h1 className="text-6xl md:text-7xl font-bold text-[#7a4b2a] leading-tight mb-8">
            {product.name}
          </h1>

          <p className="text-4xl font-semibold text-[#5c4033] mb-8">
            ₹{product.price}
          </p>

          <p className="text-[#6d5a4d] text-lg leading-relaxed mb-12 max-w-xl">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-5 mb-12">

            <button
              onClick={() =>
                setQuantity(
                  Math.max(
                    1,
                    quantity - 1
                  )
                )
              }
              className="w-12 h-12 rounded-full bg-[#e7ddd2] text-[#7a4b2a] text-2xl font-bold hover:bg-[#d8c8b7] transition"
            >
              -
            </button>

            <span className="text-2xl font-semibold text-[#7a4b2a]">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(
                  quantity + 1
                )
              }
              className="w-12 h-12 rounded-full bg-[#7a4b2a] text-white text-2xl font-bold hover:bg-[#5c4033] transition"
            >
              +
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="bg-[#7a4b2a] text-white px-10 py-5 rounded-full hover:bg-[#5c4033] transition duration-300 text-lg shadow-xl hover:scale-105"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 pb-28 relative z-10">

          <h2 className="text-5xl font-bold text-[#7a4b2a] mb-14">
            Explore Similar Pieces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {relatedProducts.map(
              (item) => (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] overflow-hidden shadow-xl"
                >

                  <Link
                    href={`/products/${item.id}`}
                  >

                    <div className="overflow-hidden">

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={500}
                        height={500}
                        unoptimized
                        className="w-full h-80 object-cover hover:scale-110 transition duration-700"
                      />
                    </div>

                    <div className="p-6">

                      <p className="uppercase tracking-[0.2em] text-[#a07a5a] text-sm mb-3">
                        {item.category}
                      </p>

                      <h3 className="text-3xl font-bold text-[#7a4b2a] mb-4">
                        {item.name}
                      </h3>

                      <p className="text-[#5c4033] text-2xl font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="max-w-5xl mx-auto px-6 pb-32">

        <h2 className="text-5xl font-bold text-[#7a4b2a] mb-14">
          Reviews
        </h2>

        {/* FORM */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl mb-14">

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              value={reviewName}
              onChange={(e) =>
                setReviewName(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none text-black"
            />

            <textarea
              placeholder="Write your review..."
              value={reviewComment}
              onChange={(e) =>
                setReviewComment(
                  e.target.value
                )
              }
              rows={5}
              className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none text-black resize-none"
            />

            {/* STARS */}
            <div className="flex gap-3">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    key={star}
                    onClick={() =>
                      setRating(star)
                    }
                  >

                    <Star
                      size={30}
                      className={
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                )
              )}
            </div>

            <button
              onClick={
                handleReviewSubmit
              }
              className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* REVIEW LIST */}
        <div className="space-y-8">

          {reviews.map(
            (review) => (

              <div
                key={review.id}
                className="bg-white rounded-[2rem] p-8 shadow-lg"
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-2xl font-bold text-[#7a4b2a]">
                    {review.name}
                  </h3>

                  <div className="flex gap-1">

                    {[...Array(
                      review.rating
                    )].map(
                      (_, i) => (

                        <Star
                          key={i}
                          size={20}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                </div>

                <p className="text-[#6d5a4d] leading-relaxed text-lg">
                  {review.comment}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}