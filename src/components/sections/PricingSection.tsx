import { createCheckout } from "@/lib/utils";
import Link from "next/link";

const ArrowSvg = () => {
  return (
    <svg
      className="w-5 h-5 text-[#47735B] mr-2 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
};

const plans = [
  {
    title: "Free",
    isRecommended: false,
    subTitle: "Get started for free",
    price: (
      <div className="mb-6">
        <span className="text-4xl font-bold">$0</span>
        <span className="text-gray-500">/month</span>
      </div>
    ),
    items: [
      "Unlimited cached requests",
      "5,000 data refreshes/month",
      "2 APIs",
      "Basic analytics",
    ],
    button: <></>,
  },
  {
    title: "Pro",
    isRecommended: true,
    subTitle: "For teams and growing projects",
    price: (
      <div className="mb-6">
        <span className="text-4xl font-bold">$10</span>
        <span className="text-gray-500">/month</span>
        <div className="text-sm text-gray-500 mt-1">
          + $1 per 10,000 data refreshes
        </div>
      </div>
    ),
    items: [
      "Unlimited cached requests",
      "Unlimited data refreshes/month",
      "Unlimited APIs",
      "Organizations",
      "Priority support",
    ],
    button: (
      <Link href={"/pricing"}>
        <button className="w-full py-3 px-6 bg-[#47735B] text-white rounded-lg font-medium transition-colors hover:bg-[#3B614B]">
          Upgrade Now
        </button>
      </Link>
    ),
  },
];

export const PricingSection = () => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-[#005430]/85 to-[#005430]/60">
      <h2 className="text-4xl font-bold text-center mb-4 gradient-text text-white">
        Usage-based pricing
      </h2>
      <p className="text-center text-gray-200 mb-16 max-w-2xl mx-auto">
        You only pay when your data is actually refreshed. All other requests
        are free — served instantly from cache.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          return (
            <div
              className="rounded-xl p-8 bg-white relative shadow-lg"
              key={plan.title}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 right-8 bg-[#005438] text-white text-xs py-1 px-3 rounded-full font-medium">
                  RECOMMENDED
                </div>
              )}
              <div className="">
                <h3 className="text-xl font-semibold mb-1">{plan.title}</h3>
                <p className="text-gray-500 mb-6">{plan.subTitle}</p>
                {plan.price}

                <ul className="space-y-3 mb-8">
                  {plan.items.map((item) => {
                    return (
                      <li className="flex items-start" key={item}>
                        <ArrowSvg />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    );
                  })}
                </ul>
                {plan.button}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
