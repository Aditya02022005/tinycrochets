"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/data/lib/supabase";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(
  null
);
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => subscription.unsubscribe();
}, []);
async function handleLogout() {
  await supabase.auth.signOut();
}

return (
  <nav className="sticky top-0 z-50 w-full bg-[#f8f3ed]/80 backdrop-blur-md border-b border-[#e7ddd2]">

    <div className="relative w-full flex items-center justify-between px-8 md:px-16 py-5">

      {/* LEFT - LOGO */}
      <Link
        href="/"
        className="flex items-center gap-4 hover:opacity-90 transition z-10"
      >
        <Image
          src="/logo.jpeg"
          alt="Tiny Crochets Logo"
          width={72}
          height={72}
          className="rounded-full bg-white p-1 shadow-md"
        />

        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[#7a4b2a]">
          tinycrochets
        </h1>
      </Link>

      {/* CENTER - NAV LINKS */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-[#5c4033] text-lg font-medium">

        <Link
          href="/"
          className="hover:text-[#7a4b2a] hover:scale-105 transition duration-200"
        >
          Home
        </Link>

        <Link
          href="/products"
          className="hover:text-[#7a4b2a] hover:scale-105 transition duration-200"
        >
          Products
        </Link>
        <Link
  href="/wishlist"
  className="hover:text-[#7a4b2a] transition"
>
  Wishlist
</Link>
        <Link
          href="/about"
          className="hover:text-[#7a4b2a] hover:scale-105 transition duration-200"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="hover:text-[#7a4b2a] hover:scale-105 transition duration-200"
        >
          Contact
        </Link>

        <div className="relative">
          <Link
            href="/cart"
            className="hover:text-[#7a4b2a] hover:scale-105 transition duration-200 font-semibold"
          >
            Cart
          </Link>

          <span className="absolute -top-3 -right-4 bg-[#7a4b2a] text-white text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
            {cart.length}
          </span>
        </div>
        
      </div>

      {/* RIGHT - AUTH */}
      <div className="hidden md:flex items-center gap-4 z-10">

        {user ? (
          <button
            onClick={handleLogout}
            className="border border-[#7a4b2a] text-[#7a4b2a] px-5 py-2 rounded-full hover:bg-[#7a4b2a] hover:text-white transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="text-[#7a4b2a] font-semibold hover:text-[#5c4033] transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-[#7a4b2a] text-white px-6 py-2 rounded-full hover:bg-[#5c4033] transition duration-300 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#7a4b2a]"
      >
        {menuOpen ? <X size={34} /> : <Menu size={34} />}
      </button>
    </div>

    {/* MOBILE MENU */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col items-center gap-6 pb-8 text-[#5c4033] text-lg font-medium">

            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({cart.length})
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);}