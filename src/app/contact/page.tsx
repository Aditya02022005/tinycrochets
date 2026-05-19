"use client";

import { motion } from "framer-motion";

import Image from "next/image";

export default function ContactPage() {

  return (
    <main className="bg-[#f8f3ed] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">

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
            Contact TinyCrochets
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-[#7a4b2a] leading-tight mb-8">
            Let’s
            <br />
            Connect
          </h1>

          <p className="text-[#6d5a4d] text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Have questions, custom order ideas
            or simply want to connect?
            We’d love to hear from you.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <a
              href="https://wa.me/919870437123"
              target="_blank"
              className="bg-[#25D366] text-white px-8 py-4 rounded-full hover:scale-105 transition duration-300 shadow-xl text-lg"
            >
              WhatsApp Us
            </a>

            <a
              href="https://instagram.com/tinycrochets11"
              target="_blank"
              className="bg-[#7a4b2a] text-white px-8 py-4 rounded-full hover:scale-105 transition duration-300 shadow-xl text-lg"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </section>

      {/* BRAND IMAGES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE 1 */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
            }}
            className="relative"
          >

            <div className="absolute inset-0 bg-[#7a4b2a]/10 blur-3xl rounded-[3rem]"></div>

            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">

              <Image
                src="/contact/thankyou.jpeg"
                alt="TinyCrochets Thank You"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* IMAGE 2 */}
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
            whileHover={{
              y: -10,
            }}
            className="relative"
          >

            <div className="absolute inset-0 bg-[#c89b74]/20 blur-3xl rounded-[3rem]"></div>

            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">

              <Image
                src="/contact/care.jpeg"
                alt="TinyCrochets Care Instructions"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="max-w-5xl mx-auto px-6 pb-32">

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
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-2xl p-10 md:p-16"
        >

          <h2 className="text-5xl font-bold text-[#7a4b2a] mb-12 text-center">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>

              <p className="uppercase tracking-[0.2em] text-[#a07a5a] mb-4">
                WhatsApp
              </p>

              <p className="text-[#5c4033] text-lg font-medium">
                +91 98704 37123
              </p>
            </div>

            <div>

              <p className="uppercase tracking-[0.2em] text-[#a07a5a] mb-4">
                Instagram
              </p>

              <p className="text-[#5c4033] text-lg font-medium">
                @_tinycrochets
              </p>
            </div>

            <div>

              <p className="uppercase tracking-[0.2em] text-[#a07a5a] mb-4">
                Response Time
              </p>

              <p className="text-[#5c4033] text-lg font-medium">
                Usually within a few hours
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}