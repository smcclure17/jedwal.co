import {
  FeatureCardProps,
  FeatureList,
  ImagePlaceholder,
  SectionHeader,
} from "./Section";

const postFeatures = [
  {
    title: "First-class, MDX compatible Markdown",
    description:
      "Posts are formatted as Markdown, supporting images, lists, tables and other expected features. Preserves JSX snippets for MDX compatibility.",
  },
  {
    title: "Automatically parse Frontmatter",
    description:
      "Frontmatter in your Google Docs is extracted, creating type-safe, post-specific metadata like OG image URLS or post descriptions",
  },
  {
    title: "Integrate with Webhooks",
    description:
      "Trigger site builds, CI/CD runs, or other.... with on-publish webhook events da yada",
  },
];

export const PostsSection = () => {
  return (
    <section className="w-full flex flex-col space-y-12">
      <SectionHeader
        title="Posts"
        subtitle="Create and publish CMS posts directly from Google Docs"
      />
      <div className="flex flex-row space-x-8">
        <ImagePlaceholder />
        <FeatureList features={postFeatures} />
      </div>
    </section>
  );
};
