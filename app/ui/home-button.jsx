import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="fixed left-5 top-5">
      <Link
        href="/"
        className="flex h-10 w-20 items-center justify-center rounded-lg bg-blue-500 text-sm font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Home
      </Link>
    </div>
  );
}
