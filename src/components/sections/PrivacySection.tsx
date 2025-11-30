import {
  SecondaryFeatureList,
  SecondarySectionHeader,
} from "./SecondarySection";

const postFeatures = [
  {
    title: "Limited Access",
    description:
      "Only accesses files you explicitly authorize, not your whole Google Drive.",
  },
  {
    title: "Encrypted",
    description: "All sensitive data is envelope-encrypted.",
  },
];

export const PrivacySection = () => {
  return (
    <section className=" w-full flex flex-col space-y-12">
      <SecondarySectionHeader title="More Privacy" subtitle="" align="center" />
      <div className="flex flex-row  space-x-8">
        <SecondaryFeatureList features={postFeatures} direction="row" />
      </div>
    </section>
  );
};
