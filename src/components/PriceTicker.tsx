import { getProducts } from "@/lib/api";
import { UNIT_SHORT, bnPercent, toBn } from "@/lib/bn";

export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return null;
  const items = [...products, ...products]; // duplicated for a seamless loop

  return (
    <div className="overflow-hidden border-b border-black/5 bg-card">
      <div className="marquee-track flex w-max">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 whitespace-nowrap border-r border-black/5 px-4 py-2 text-sm"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-gray-600">
              {toBn(p.today)} টাকা/{UNIT_SHORT[p.unit]}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "text-red-600"
                  : p.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}{" "}
              {bnPercent(p.change.pct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}