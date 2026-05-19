"use client";

import { motion } from "framer-motion";

import Link from "next/link";

export default function Hero() {

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/products/hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 max-w-7xl mx-auto px-8 pt-24 md:pt-32 w-full"
      >

        <div className="max-w-2xl">

          <p className="uppercase tracking-[0.3em] text-white/70 mb-5 text-sm">
            Handmade Crochet Boutique
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-8">
            Handmade
            <br />
            With Love
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Unique crochet flowers,
            bouquets, gifts and
            handmade creations crafted
            beautifully for every
            special moment.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">

            {/* SHOP NOW */}
            <a
              href="#best-sellers"
              className="bg-[#9b643d] text-white px-10 py-5 rounded-full text-xl hover:scale-105 transition duration-300 shadow-xl"
            >
              Shop Now
            </a>

            {/* EXPLORE */}
            <Link
              href="/products"
              className="border border-white/40 backdrop-blur-xl text-white px-10 py-5 rounded-full text-xl hover:bg-white/10 transition duration-300 inline-flex items-center justify-center"
            >
              Explore Collection
            </Link>

          </div>
        </div>
      </motion.div>
    </section>
  );
}