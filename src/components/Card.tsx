export interface CardProps {
  title: string;
  description: string;
  badge?: string; // "Coming Soon" | "New!" | "Beta"
}

export const Card = ({ title, description, badge }: CardProps) => {
  return (
    <div className="w-sm px-6 py-3 sm:rounded-md bg-gray-50 border border-gray-100">
      <div className="flex items-center space-x-2 mb-2">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          {title}
        </h5>
        {badge && (
          <span className="text-xs text-green-900 font-medium border border-green-900 px-1 py-0.5 rounded-md bg-white">
            {badge}
          </span>
        )}
      </div>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
