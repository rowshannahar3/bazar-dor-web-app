import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { UNIT_LABEL, UNIT_SHORT, bnPercent, toBn, toBnMoney } from "@/lib/bn";
import { ChangeBadge } from "@/components/ProductCard";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // real session check (the proxy only checks that a cookie exists)
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}&protected=1`);
  }

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const diff = Math.abs(p.today - p.yesterday);
  const minPrice = p.markets.length ? Math.min(...p.markets.map((m) => m.min)) : p.today;
  const maxPrice = p.markets.length ? Math.max(...p.markets.map((m) => m.max)) : p.today;

  const trend =
    p.change.dir === "up"
      ? { word: "বেড়েছে", color: "text-red-600" }
      : p.change.dir === "down"
      ? { word: "কমেছে", color: "text-green-600" }
      : { word: "অপরিবর্তিত আছে", color: "text-gray-600" };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-4">
      {/* breadcrumb */}
      <nav className="mt-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:underline">
          {p.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800">{p.nameBn}</span>
      </nav>

      {/* summary */}
      <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-black/5 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-black/5 text-4xl">
            {p.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1>
            <p className="text-sm text-gray-500">
              {UNIT_LABEL[p.unit]} · {p.categoryNameBn}
            </p>
            <p className="mt-1 text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              <span className={`font-bold ${trend.color}`}>{trend.word}</span>
              {p.change.dir !== "flat" && <> · {toBn(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-black/5 px-6 py-3 text-center">
          <p className="text-xs text-gray-600">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(p.today)}</p>
          <p className="text-xs text-gray-600">টাকা / {UNIT_SHORT[p.unit]}</p>
          <div className="mt-1">
            <ChangeBadge change={p.change} />
          </div>
        </div>
      </section>

      {/* price summary */}
      <section className="mt-5 rounded-2xl border border-black/5 bg-card p-5">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-black/5 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-600">{toBn(minPrice)} <span className="text-sm font-normal">টাকা</span></p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-black/5 p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-xl font-bold text-red-600">{toBn(maxPrice)} <span className="text-sm font-normal">টাকা</span></p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-black/5 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold text-brand">{toBn(p.today)} <span className="text-sm font-normal">টাকা</span></p>
            <p className="text-xs text-gray-500">{UNIT_LABEL[p.unit]}-এর হিসাবে</p>
          </div>
        </div>

        {/* market table */}
        <h2 className="mt-6 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m, i) => (
                <tr key={m.market} className={i % 2 === 1 ? "bg-black/[0.03]" : ""}>
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">
                    {toBnMoney((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}