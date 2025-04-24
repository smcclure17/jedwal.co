const cards = [
  {
    title: "Startups & Founders",
    description:
      "Launch MVPs and validate ideas faster without building complex backend infrastructure.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    title: "Marketing Teams",
    description:
      "Create content APIs, product catalogs, and landing page data without IT department dependency.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Developers",
    description:
      "Prototype faster, building frontends while non-technical stakeholders update Google Sheets.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
];

export const UseCases = () => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
        Built for teams of all sizes
      </h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Use the tools your team already knows. No need to train on complex
        databases or backend systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {cards.map((card, index) => (
          <div key={index}>
            <div className="h-14 w-14 rounded-full bg-[#E7F1ED] flex items-center justify-center mb-6">
              <svg
                className="w-7 h-7 text-[#47735B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {card.icon}
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
