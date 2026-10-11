import Link from "next/link";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import CategoryNav from "./CategoryNav";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  return (
    <header className="border-b border-black/5 bg-card">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-xl text-white">
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold">বাজার দর</span>
              <span className="block text-[11px] text-gray-500">{bnDate()}</span>
            </span>
          </Link>
          <AuthButtons />
        </div>
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}