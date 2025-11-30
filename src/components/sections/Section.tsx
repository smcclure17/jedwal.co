export interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className=" flex flex-col space-y-2 py-6  w-full">
      <p className="text-h5 font-medium">{title}</p>
      <p>{description}</p>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "left" | "right" | "center";
}

export const SectionHeader = ({
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-2 text-${align}`}>
      <h2 className="text-h2">{title}</h2>
      <h3 className="text-h4">{subtitle}</h3>
    </div>
  );
};

export const ImagePlaceholder = () => {
  return <div className="  rounded-md bg-gray-100 border-gray-200 min-h-96 w-1/2"></div>;
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
    <div className={`w-1/2 flex ${directionStyle} text-sm`}>
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
