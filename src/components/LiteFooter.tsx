import { getUserData } from "@/data/fetching";
import Link from "next/link";

export interface LiteFooterProps {}

export const LiteFooter = async ({}: LiteFooterProps) => {
  const { userData } = await getUserData();
  const isPremium = userData?.premium;

  return (
    <div className="flex flex-row mx-auto space-x-6 mt-20 text-sm font-light pb-4">
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
      {isPremium && (
        <Link
          href="https://billing.stripe.com/p/login/test_cN25oncgx0WN8fu7ss"
          className="text-gray-600 hover:text-gray-900"
        >
          Manage My Subscription
        </Link>
      )}
    </div>
  );
};
