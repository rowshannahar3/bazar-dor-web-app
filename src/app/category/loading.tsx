export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="skeleton mt-6 h-24 w-full rounded-2xl" />
      <div className="skeleton mt-4 h-16 w-full rounded-2xl" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}