export const BetaDisclaimerBanner = ({
  text = "Organizations are in beta",
}) => {
  return (
    <div className="w-full bg-blue-50 border border-blue-700 p-3 flex items-start justify-between mb-6 rounded-md shadow-sm">
      <div className="flex items-center space-x-3">
        <Icon className="text-blue-700 size-6" />
        <div className="flex flex-col">
          <span className="font-semibold text-blue-700">{text}</span>
          <span className="text-xs text-slate-900 mt-1">
            We'll be adding new features soon. For now, organizations are
            limited to 2 APIs each.
          </span>
        </div>
      </div>
      <div className="px-2 py-1 rounded-md bg-blue-700 text-xs font-semibold text-white uppercase self-center">
        Beta
      </div>
    </div>
  );
};

const Icon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
    />
  </svg>
);
