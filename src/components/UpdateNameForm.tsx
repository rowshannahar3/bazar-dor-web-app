"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    if (name.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (name === currentName) return toast("নাম আগের মতোই আছে");

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block text-sm font-medium">
        নাম
        <input
          name="name"
          type="text"
          defaultValue={currentName}
          placeholder="আপনার নাম লিখুন"
          className="input input-bordered mt-1 w-full bg-white"
          autoComplete="name"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "তথ্য আপডেট করুন"
        )}
      </button>

      <Link href="/profile" className="block text-center text-sm text-gray-500 hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
}