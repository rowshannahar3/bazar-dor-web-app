"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthCard from "./AuthCard";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (name.length < 2) return fail("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    setError("");
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      return fail(
        error.code?.startsWith("USER_ALREADY_EXISTS")
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
      );
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={
        <>
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-brand hover:underline">
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="block text-sm font-medium">
          নাম
          <input
            name="name"
            type="text"
            placeholder="যেমন: রহিম উদ্দিন"
            className="input input-bordered mt-1 w-full bg-white"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm font-medium">
          ইমেইল
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input input-bordered mt-1 w-full bg-white"
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered mt-1 w-full bg-white"
            autoComplete="new-password"
          />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input
            name="confirm"
            type="password"
            placeholder="আবার লিখুন"
            className="input input-bordered mt-1 w-full bg-white"
            autoComplete="new-password"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL="/" />
    </AuthCard>
  );
}