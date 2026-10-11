import Link from "next/link";
import { Product } from "@/lib/types";
import { UNIT_LABEL, bnPercent, toBn } from "@/lib/bn";

export function ChangeBadge({ change }: { change: Product["change"] }) {
  const style =
    change.dir === "up"
      ? "bg-red-50 text-red-600"
      : change.dir === "down"
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";
  const icon = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {icon} {bnPercent(change.pct)}
    </span>
  );
}

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-black/5 bg-card p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-2xl">
          {p.image}
        </span>
        <div className="leading-tight">
          <p className="font-semibold">{p.nameBn}</p>
          <p className="text-xs text-gray-500">{UNIT_LABEL[p.unit]}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-600">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">
          {toBn(p.today)} <span className="text-sm font-normal">টাকা</span>
        </p>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}