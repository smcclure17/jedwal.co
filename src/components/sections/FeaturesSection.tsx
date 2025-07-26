const features = [
  {
    title: "Autoscaling",
    description: "We scale as you grow, no need to worry about infrastructure.",
    points: [
      "Handles any traffic volume",
      "Global edge network",
    ],
  },
  {
    title: "Organizations",
    isBeta: true,
    description: "Collaborate by sharing APIs across your teams.",
    points: ["Team management", "Shared API access", "Consolidated billing"],
  },
  {
    title: "Analytics",
    description: "Get insight into your API usage and traffic.",
    points: ["Near-Real-time usage metrics"],
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
        Google Drive as a Content Management System
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Everything you need to turn your Google Drive into a simple, powerful CMS
        without complex infrastructure
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => {
          return (
            <div className="feature-card border border-gray-200 rounded-xl p-8 bg-white" key={feature.title}>
              <div className="flex flex-row space-x-2">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                {feature.isBeta && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-2xl py-1 px-2 max-h-6">
                    Beta
                  </span>
                )}
              </div>
              <p className="text-gray-600">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.points.map((point) => {
                  return (
                    <li className="flex items-start" key={point}>
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
                      <span className="text-gray-600 text-sm">{point}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
