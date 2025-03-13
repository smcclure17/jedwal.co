import { getUserData } from "@/data/fetching";
import { ErrorScreen } from "@/components/ErrorScreen";
import Image from "next/image";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";
import { Patrick_Hand } from "next/font/google";
import { RedirectToUserDashboard } from "@/components/RedirectToUserDashboard";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default async function Redirect() {
  const user = await getUserData();
  if (user.status === "logged_out") return <NotLoggedInScreen />;
  if (user.status === "error") return <ErrorScreen />;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 pb-32">
      <RedirectToUserDashboard userId={user.data.id} />
      <Image
        src="/logo-cropped.svg"
        width={120}
        height={120}
        alt="Jedwal logo"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        className="mb-4"
      />

      <h2
        className={`text-2xl text-[#005430] text-center ${patrick.className}`}
      >
        Redirecting to your dashboard...
      </h2>
    </div>
  );
}
