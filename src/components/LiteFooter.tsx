import Link from "next/link";

export const LiteFooter = async ({ mt = 20 }: { mt?: number }) => {
  return (
    <div
      className={`flex flex-row mx-auto space-x-6 mt-${mt} text-sm font-light pb-4`}
    >
      <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
        Privacy Policy
      </Link>
      <Link href="/tos" className="text-gray-600 hover:text-gray-900">
        Terms of Service
      </Link>
      <Link
        href="https://github.com/smcclure17/api.jedwal.co"
        className="text-gray-600 hover:text-gray-900"
      >
        Source Code
      </Link>
    </div>
  );
};
