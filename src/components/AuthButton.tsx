import Link from "next/link";

export default function AuthButtons() {
  const user = null; // TODO: replace with BetterAuth session in the auth step

  if (user) return null; // profile dropdown comes later

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