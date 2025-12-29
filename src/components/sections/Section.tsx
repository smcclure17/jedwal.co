
export interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col space-y-2 py-6 w-full">
      <p className="text-title-large">{title}</p>
      <p className="text-body-medium text-gray-600">{description}</p>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  align?: "left" | "right" | "center";
}

export const SectionHeader = ({
  title,
  subtitle,
  align = "left",
  icon,
}: SectionHeaderProps) => {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";
  return (
    <div className="flex flex-row space-x-6">
      {icon}
      <div className={`flex flex-col space-y-2 ${alignClass}`}>
        <h2 className="text-headline-medium">{title}</h2>
        <h3 className="text-title-large">{subtitle}</h3>
      </div>
    </div>
  );
};

export const ImagePlaceholder = () => {
  return (
    <div className="rounded-md bg-gray-50 border border-[#005430] min-h-96 w-full md:w-1/2"></div>
  );
};

export const FeatureList = ({
  features,
  direction = "col",
}: {
  features: FeatureCardProps[];
  direction?: "row" | "col";
}) => {
  const directionStyle =
    direction === "row" ? "flex-row space-x-4 mx-auto" : "flex-col space-y-4";
  return (
    <div className={`w-full md:w-1/2 flex ${directionStyle} text-sm`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};
