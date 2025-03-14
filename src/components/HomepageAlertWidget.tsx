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
    <Link href="/blog/roadmap-and-release-notes">
      <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium text-slate-700 bg-[#005843] bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors">
        <span className="mr-1.5 flex h-2 w-2 relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005843]"></span>
        </span>
        New post: Roadmap and Release Notes
      </div>
    </Link>
  );
};
