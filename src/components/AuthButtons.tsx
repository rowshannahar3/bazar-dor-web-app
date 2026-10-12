"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import UserMenu from "./UserMenu";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="skeleton h-9 w-32 rounded-lg" />;

  if (session?.user) return <UserMenu user={session.user} />;

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-sm sm:btn-md border-0 bg-brand text-white hover:bg-brand-dark"
      >
        সাইন আপ
      </Link>
    </div>
  );
}