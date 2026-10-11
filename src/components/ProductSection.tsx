import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}