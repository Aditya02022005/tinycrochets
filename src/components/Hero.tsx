"use client";

import { motion } from "framer-motion";
export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/products/hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55"></div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
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
            Unique crochet flowers, bouquets, gifts and handmade creations
            crafted beautifully for every special moment.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:bg-[#5c4033] transition text-lg shadow-lg">
              Shop Now
            </button>

            <button className="border border-white/40 text-white px-8 py-4 rounded-full hover:bg-white/10 transition text-lg backdrop-blur-sm">
              Explore Collection
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}