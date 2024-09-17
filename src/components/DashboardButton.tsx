import Link from "next/link";

export function DashboardButton() {
  return (
    <Link
      href="https://app.jedwal.co"
      className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400 font-medium rounded-full text-xl px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-60 text-center border-2 border-gray-900 h-11"
    >
      Go to your dashboard
    </Link>
  );
}
