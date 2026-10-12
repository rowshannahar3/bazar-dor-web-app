"use client";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    // sort by the real numeric price, never by the Bengali-digit string
    return [...products].sort((a, b) =>
      sort === "asc" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  return (
    <>
      <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl border border-black/5 bg-card p-4">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-sm w-auto bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}