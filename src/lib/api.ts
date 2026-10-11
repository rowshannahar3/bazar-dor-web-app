import { Category, Product } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // try the next base URL
    }
  }
  throw new Error("API unavailable");
}

export const getProducts = () => get<Product[]>("/products");
export const getCategories = () => get<Category[]>("/categories");
export const getProduct = (id: string | number) => get<Product>(`/products/${id}`);

export async function getProductBySlug(slug: string) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}