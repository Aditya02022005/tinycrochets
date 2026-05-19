"use client";

import { useState } from "react";
import { supabase } from "@/data/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
     toast.error(error.message);;
    } else {
      document.cookie = `user-email=${email}; path=/`;

      if (
        email === "tinycrochets11@gmail.com"
      ) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          "http://localhost:3000",
      },
    });
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-[#f8f3ed]">

      {/* LEFT SIDE */}
      <div
        className="hidden md:flex relative items-center justify-center p-12"
        style={{
          backgroundImage:
            "url('/products/hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-white max-w-lg">
          <p className="uppercase tracking-[0.3em] text-sm mb-4">
            TinyCrochets Boutique
          </p>

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Welcome
            <br />
            Back
          </h1>

          <p className="text-lg text-white/90 leading-relaxed">
            Login and continue exploring
            handcrafted crochet creations
            made beautifully with love.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center px-6 py-16 overflow-hidden">

        {/* BACKGROUND BLOBS */}
        <div className="absolute w-96 h-96 bg-[#c89b74]/20 rounded-full blur-3xl top-10 left-10"></div>

        <div className="absolute w-[28rem] h-[28rem] bg-[#7a4b2a]/10 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="absolute w-72 h-72 bg-white/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        {/* FORM CARD */}
        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white/40">

          <div className="mb-10 text-center">
            <h2 className="text-5xl font-bold text-[#7a4b2a] mb-3">
              Welcome Back
            </h2>

            <p className="text-[#7b6a58]">
              Login to your account
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-[#e8ddd2] bg-white py-4 rounded-2xl hover:bg-[#f8f3ed] transition duration-300 text-lg font-medium text-[#5c4033] mb-5 flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />

            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-5">
            <div className="h-px bg-[#e8ddd2] flex-1"></div>

            <span className="text-[#9a8775] text-sm">
              OR
            </span>

            <div className="h-px bg-[#e8ddd2] flex-1"></div>
          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none focus:border-[#7a4b2a] text-black transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 outline-none focus:border-[#7a4b2a] text-black transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7a4b2a] text-white py-4 rounded-2xl hover:bg-[#5c4033] transition duration-300 text-lg font-medium shadow-lg hover:scale-[1.02]"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>
          </form>

          <p className="text-center text-[#7b6a58] mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7a4b2a] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}