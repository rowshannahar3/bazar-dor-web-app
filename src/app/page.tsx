import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // most negative first
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-4">
      <Hero />
      <ProductSection
        title={<><span className="text-red-600">▲</span> আজ দাম বেড়েছে</>}
        products={risers}
      />
      <ProductSection
        title={<><span className="text-green-600">▼</span> আজ দাম কমেছে</>}
        products={fallers}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}