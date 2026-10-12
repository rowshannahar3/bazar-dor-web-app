export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="skeleton mt-6 h-5 w-48 rounded" />
      <div className="skeleton mt-4 h-36 w-full rounded-2xl" />
      <div className="skeleton mt-5 h-96 w-full rounded-2xl" />
    </div>
  );
}