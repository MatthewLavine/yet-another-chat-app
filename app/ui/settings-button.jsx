import Link from "next/link";

export default function SettingsButton() {
  return (
    <div className="fixed left-28 top-5">
      <Link
        href="/settings"
        className="flex h-10 w-20 items-center justify-center rounded-lg bg-orange-500 text-sm font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Settings
      </Link>
    </div>
  );
}
