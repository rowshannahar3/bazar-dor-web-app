import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-center text-sm text-gray-500">{subtitle}</p>

      <div className="mt-6 rounded-2xl border border-black/5 bg-card p-6 shadow-sm">
        {children}
        <p className="mt-5 text-center text-sm">{footer}</p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}