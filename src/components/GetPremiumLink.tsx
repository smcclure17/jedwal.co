import Link from "next/link";

export const GetPremiumLink = ({ email }: { email: string }) => {
  return (
    <Link
      href={`https://buy.stripe.com/test_dR67vP7iT8dPbny7ss?prefilled_email=${email}`}
      target="_blank"
    >
      <button
        type="button"
        className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-md text-sm px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 transition ease-in-out duration-300"
      >
        Get Premium
      </button>
    </Link>
  );
};
