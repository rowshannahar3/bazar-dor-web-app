import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export const metadata: Metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackUrl=%2Fprofile%2Fupdate&protected=1");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-center text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-center text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>

      <div className="mt-6 rounded-2xl border border-black/5 bg-card p-6 shadow-sm">
        <UpdateNameForm currentName={session.user.name} />
      </div>
    </div>
  );
}