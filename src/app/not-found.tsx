import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link
        href="/"
        className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}