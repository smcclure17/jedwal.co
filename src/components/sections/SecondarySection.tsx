export interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className=" flex flex-col space-y-2 px-6  w-full">
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

export const SecondarySectionHeader = ({
  title,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-2 text-${align}`}>
      <h2 className="text-h2">{title}</h2>
    </div>
  );
};

export const SecondaryFeatureList = ({
  features,
  direction = "col",
}: {
  features: FeatureCardProps[];
  direction?: "row" | "col";
}) => {
  return (
    <div className={`mx-auto text-center flex text-sm`}>
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
