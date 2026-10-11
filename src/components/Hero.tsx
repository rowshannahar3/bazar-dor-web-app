import Image from "next/image";
import { bnDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="mt-6 grid items-center gap-6 rounded-3xl border border-black/5 bg-card p-6 sm:p-8 md:grid-cols-2">
      <div>
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-brand">
          {bnDate()}
        </span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="btn mt-5 border-0 bg-brand text-white hover:bg-brand-dark"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src="/images/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={420}
          height={320}
          className="h-auto w-full max-w-xs sm:max-w-sm"
          priority
        />
      </div>
    </section>
  );
}