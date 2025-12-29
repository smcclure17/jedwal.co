import Image from "next/image";

export interface SecurityFeatureProps {
  title: string;
  description: string;
}

const SecurityFeatureCard = ({
  title,
  description,
  isAlternate,
}: SecurityFeatureProps & { isAlternate: boolean }) => {
  return (
    <div className={`flex flex-col space-y-3 p-6 rounded-lg border border-border ${isAlternate ? 'bg-muted/30' : 'bg-card'}`}>
      <h3 className="text-title-large font-medium">{title}</h3>
      <p className="text-body-large text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const securityFeatures = [
  {
    title: "Limited Access",
    description:
      "Jedwal only accesses files you explicitly authorize, not your whole Google Drive.",
  },
  {
    title: "Encrypted",
    description: "All sensitive data is envelope-encrypted at rest.",
  },
];

export const PrivacySection = () => {
  return (
    <section className="w-full mx-auto flex flex-col space-y-12">
      <div className="flex flex-row space-x-6 items-center">
        <Image
          src={"/lock.svg"}
          alt="lock icon"
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div className="flex flex-col space-y-2">
          <h2 className="text-headline-medium">More Security</h2>
          <p className="text-body-large text-muted-foreground">
            Limited data access by design
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityFeatures.map((feature, index) => (
          <SecurityFeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            isAlternate={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};
