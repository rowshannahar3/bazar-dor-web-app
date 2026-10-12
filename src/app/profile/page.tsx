import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackUrl=%2Fprofile&protected=1");

  const { user } = session;
  const initial = user.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {/* identity card */}
      <section className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-card p-5">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="h-16 w-16 rounded-xl object-cover" />
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-xl bg-brand text-2xl font-bold text-white">
              {initial}
            </span>
          )}
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      {/* info card */}
      <section className="mt-5 rounded-2xl border border-black/5 bg-card p-5">
        <h2 className="font-bold">তথ্য</h2>
        <div className="mt-4">
          <p className="text-sm font-medium">নাম</p>
          <p className="mt-1 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm">
            {user.name}
          </p>
        </div>
        <Link
          href="/profile/update"
          className="btn mt-4 w-full border-0 bg-brand text-white hover:bg-brand-dark"
        >
          আপডেট
        </Link>
      </section>
    </div>
  );
}