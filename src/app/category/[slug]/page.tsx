import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound(); // invalid slug -> 404 page with "হোম পেজে ফিরে যান"

  const items = products.filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-4">
      <section className="mt-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-card p-5">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-black/5 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-black/5 bg-card px-4 py-16 text-center">
          <p className="text-5xl">🛒</p>
          <h2 className="mt-4 text-xl font-bold">এই ক্যাটাগরিতে কোনো পণ্য নেই</h2>
          <Link
            href="/"
            className="btn mt-5 border-0 bg-brand text-white hover:bg-brand-dark"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategoryProducts products={items} />
      )}
    </div>
  );
}