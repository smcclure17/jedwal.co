import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export const CtaSection = () => {
  return (
    <section className="w-full bg-[#005843] py-16 px-8 md:px-16 flex flex-col items-center text-center space-y-2">
      <div className="flex flex-col space-y-3 max-w-2xl">
        <h2 className="text-display-small md:text-display-medium text-white">
          Get Started
        </h2>
        <p className="text-title-md text-white/90">
          Connect your Google Drive and start publishing now.
        </p>
      </div>
      <div className="mt-2">
        <GoogleSignInButton />
      </div>
    </section>
  );
};
