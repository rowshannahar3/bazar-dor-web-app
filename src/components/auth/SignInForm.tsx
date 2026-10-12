"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthCard from "./AuthCard";
import SocialButtons from "./SocialButtons";

// only allow internal redirects
const safePath = (p: string | null) =>
  p && p.startsWith("/") && !p.startsWith("//") ? p : "/";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = safePath(params.get("callbackUrl"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.get("protected")) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg =
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
          : error.message || "সাইন ইন করা যায়নি";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-brand hover:underline">
            সাইন আপ করুন
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
            autoComplete="current-password"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark"
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons callbackURL={callbackUrl} />
    </AuthCard>
  );
}