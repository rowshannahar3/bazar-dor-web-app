"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type MenuUser = { name: string; email: string; image?: string | null };

export default function UserMenu({ user }: { user: MenuUser }) {
  const router = useRouter();
  const close = () => (document.activeElement as HTMLElement | null)?.blur();

  async function signOut() {
    close();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  const initial = user.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="flex items-center gap-2 rounded-full p-1 pr-3 transition hover:bg-black/5"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white">
            {initial}
          </span>
        )}
        <span className="hidden text-sm font-medium sm:inline">
          {user.name.split(" ")[0]}
        </span>
        <span className="text-[10px] text-gray-500">▾</span>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-black/5 bg-card p-3 shadow-lg"
      >
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs text-gray-500">{user.email}</p>
        <div className="my-2 border-t border-black/5" />
        <Link
          href="/profile"
          onClick={close}
          className="block rounded-lg px-2 py-1.5 text-sm hover:bg-black/5"
        >
          👤 আমার প্রোফাইল
        </Link>
        <button
          onClick={signOut}
          className="mt-1 block w-full rounded-lg px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>
    </div>
  );
}