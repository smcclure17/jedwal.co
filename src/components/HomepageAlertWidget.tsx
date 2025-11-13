import Link from "next/link";

interface HomepageAlertWidgetProps {
  page: string;
  text: string;
}

export const HomepageAlertWidget = ({
  page,
  text,
}: HomepageAlertWidgetProps) => {
  return (
    <Link href={page}>
      <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-slate-900  border bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors">
        <span className="mr-1.5 flex h-2 w-2 relative">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005843]"></span>
        </span>
        {text}
      </div>
    </Link>
  );
};
