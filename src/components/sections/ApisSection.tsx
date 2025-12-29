import Image from "next/image";

interface ApiFeatureProps {
  title: string;
  description: string;
}

const ApiFeatureCard = ({
  title,
  description,
  isAlternate,
}: ApiFeatureProps & { isAlternate: boolean }) => {
  return (
    <div
      className={`flex flex-col space-y-3 p-6 rounded-lg border border-border ${
        isAlternate ? "bg-muted/30" : "bg-card"
      }`}
    >
      <h3 className="text-title-large font-medium">{title}</h3>
      <p className="text-body-large text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const apiFeatures = [
  {
    title: "JSON REST API endpoints for all worksheets",
    description:
      "Transform Google Sheet worksheets into JSON data to integrate with your web apps or data pipelines.",
  },
  {
    title: "Near-realtime API data updates",
    description:
      "Customize how quickly your APIs are updated. Cached results are served instantly.",
  },
  {
    title: "Get notified on API update",
    description:
      "Connect webhooks to receive notifications when your API spreadsheet data is updated.",
  },
];

export const ApisSection = () => {
  return (
    <section className="w-full mx-auto flex flex-col space-y-12">
      <div className="flex flex-row space-x-6 items-center">
        <Image
          src={"/plug.svg"}
          alt="plug icon"
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div className="flex flex-col space-y-2">
          <h2 className="text-headline-medium">APIs</h2>
          <p className="text-body-large text-muted-foreground">
            Generate auto-updating REST APIs from Google Sheets
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apiFeatures.map((feature, index) => (
          <ApiFeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            isAlternate={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
};
