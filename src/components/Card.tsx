export interface CardProps {
  title: string;
  description: string;
  badge?: string; // "Coming Soon" | "New!" | "Beta"
}

export const Card = ({ title, description, badge }: CardProps) => {
  return (
    <div
      className="px-6 py-3 w-full bg-white border border-[#005430] shadow-xs md:max-w-72 text-center"
      style={{
        border: "solid 3px #41403E",
        borderTopLeftRadius: "255px 15px",
        borderTopRightRadius: "15px 225px",
        borderBottomRightRadius: "225px 15px",
        borderBottomLeftRadius: "15px 255px",
      }}
    >
      <div className="flex justify-center align-middle items-center space-x-2">
        <h5 className="text-2xl font-normal tracking-tight text-gray-900 mb-2">
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
