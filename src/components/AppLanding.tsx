import { Patrick_Hand } from "next/font/google";
import { Button } from "./ui/button";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});



export const AppLanding = async () => {

  return (
    <div className="flex margin-auto mt-24 rounded-lg w-fit">
      <div className="flex flex-col">
        <h1 className={`${patrick.className} text-4xl text-[#005430]`}>
          Let's get started
        </h1>
        <Button>Posts</Button>
      </div>
    </div>
  );
};
