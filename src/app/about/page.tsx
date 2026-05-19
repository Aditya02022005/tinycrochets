"use client";

import { motion } from "framer-motion";

import Image from "next/image";

export default function AboutPage() {

  return (
    <main className="bg-[#f8f3ed] min-h-screen overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">

        {/* BLOBS */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c89b74]/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#7a4b2a]/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          className="relative z-10 text-center max-w-4xl"
        >

          <p className="uppercase tracking-[0.4em] text-[#a07a5a] mb-6">
            About TinyCrochets
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-[#7a4b2a] leading-tight mb-8">
            Handmade
            <br />
            With Love
          </h1>

          <p className="text-[#6d5a4d] text-xl leading-relaxed">
            TinyCrochets is more than just
            crochet creations — it’s a story
            of passion, artistry and timeless
            handmade elegance crafted with
            love in every stitch.
          </p>
        </motion.div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="absolute inset-0 bg-[#7a4b2a]/10 blur-3xl rounded-[3rem]"></div>

          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">

            <Image
              src="/products/hero.jpeg"
              alt="TinyCrochets"
              width={900}
              height={900}
              className="w-full h-[650px] object-cover"
            />
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
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
            Our Story
          </p>

          <h2 className="text-5xl font-bold text-[#7a4b2a] mb-8 leading-tight">
            Crafting Beauty
            <br />
            One Stitch at a Time
          </h2>

          <p className="text-[#6d5a4d] text-lg leading-relaxed mb-6">
            TinyCrochets began with a simple
            passion for handmade artistry and
            elegant crochet creations that
            feel personal, timeless and full
            of warmth.
          </p>

          <p className="text-[#6d5a4d] text-lg leading-relaxed mb-6">
            Every bouquet, flower and crochet
            piece is thoughtfully handcrafted
            with attention to detail, blending
            creativity with premium aesthetics.
          </p>

          <p className="text-[#6d5a4d] text-lg leading-relaxed">
            We believe handmade creations
            carry emotions, memories and
            uniqueness that mass-produced
            products never can.
          </p>
        </motion.div>
      </section>

      {/* VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[0.3em] text-[#a07a5a] mb-5">
            Why TinyCrochets
          </p>

          <h2 className="text-5xl font-bold text-[#7a4b2a]">
            Crafted To Feel Special
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Handmade Elegance",
              desc: "Every creation is handcrafted with precision and love.",
            },
            {
              title: "Premium Quality",
              desc: "Beautiful materials and detailed craftsmanship in every piece.",
            },
            {
              title: "Made With Emotion",
              desc: "Our crochet creations are designed to create lasting memories.",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 shadow-xl"
            >

              <h3 className="text-3xl font-bold text-[#7a4b2a] mb-6">
                {item.title}
              </h3>

              <p className="text-[#6d5a4d] leading-relaxed text-lg">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}