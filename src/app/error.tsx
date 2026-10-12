"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="mt-2 text-gray-600">ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
      <button
        onClick={reset}
        className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}