"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-t border-black/5 pb-2 pt-2">
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active ? "bg-brand text-white" : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <span>{c.icon}</span>
            {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}