import Image from "next/image";

interface PostFeatureProps {
  title: string;
  description: string;
}

const PostFeatureCard = ({ title, description, isAlternate }: PostFeatureProps & { isAlternate: boolean }) => {
  return (
    <div className={`flex flex-col space-y-3 p-6 rounded-lg border border-border ${isAlternate ? 'bg-muted/30' : 'bg-card'}`}>
      <h3 className="text-title-large font-medium">{title}</h3>
      <p className="text-body-large text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const postFeatures = [
  {
    title: "First-class, MDX compatible Markdown",
    description:
      "Posts are formatted as Markdown, supporting images, lists, tables and other expected features. Preserves JSX snippets for MDX compatibility.",
  },
  {
    title: "Automatically parse Frontmatter",
    description:
      "Frontmatter in your Google Docs is extracted, creating type-safe, post-specific metadata like OG image URLS or post descriptions.",
  },
  {
    title: "Integrate with Webhooks",
    description:
      "Trigger site builds, CI/CD runs, or other integrations with on-publish webhook events.",
  },
];

export const PostsSection = () => {
  return (
    <section className="w-full mx-auto flex flex-col space-y-12">
      <div className="flex flex-row space-x-6 items-center">
        <Image
          src={"/file.svg"}
          alt="file icon"
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div className="flex flex-col space-y-2">
          <h2 className="text-headline-medium">Posts</h2>
          <p className="text-body-large text-muted-foreground">
            Publish CMS posts directly from Google Docs
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {postFeatures.map((feature, index) => (
          <PostFeatureCard
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
