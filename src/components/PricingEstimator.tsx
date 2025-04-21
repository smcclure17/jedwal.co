"use client";

import { useEffect, useState } from "react";

export const PricingEstimator = () => {
  const [refreshes, setRefreshes] = useState(5000);
  const [price, setPrice] = useState(10);
  useEffect(() => {
    const billableRefreshes = Math.max(0, refreshes - 5000);
    const additionalCost = billableRefreshes * 0.0001;
    console.log(billableRefreshes);
    setPrice(10 + additionalCost);
  }, [refreshes]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRefreshes(event.target.value as unknown as number);
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-6">
          Estimate your monthly cost
        </h3>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly data refreshes
            </label>
            <div className="relative">
              <select
                id="data-refreshes"
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-[#47735B] focus:border-[#47735B] rounded-md border"
                onChange={handleSelectChange}
                value={refreshes}
              >
                <option value={5000}>5,000 refreshes (Free tier)</option>
                <option value={10000}>10,000 refreshes</option>
                <option value={15000}>15,000 refreshes</option>
                <option value={50000}>50,000 refreshes</option>
                <option value={100000}>100,000 refreshes</option>
                <option value={500000}>500,000 refreshes</option>
                <option value={1000000}>1,000,000 refreshes</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">
              Estimated monthly cost
            </div>
            <div
              className="text-3xl font-bold text-[#47735B]"
              id="estimated-cost"
            >
              ${price}
            </div>
            <div className="text-xs text-gray-500 mt-1">Base fee + usage</div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>
            The base fee of $10/month includes 5,000 free data refreshes. After
            that, you pay $1 per 10,000 additional refreshes.
          </p>
        </div>
      </div>
    </div>
  );
};
