import { Patrick_Hand_SC } from "next/font/google";

const patrick = Patrick_Hand_SC({
  subsets: ["latin"],
  weight: "400",
});

export interface UserSheetsListProps {
  children?: React.ReactNode;
}

export const UserSheetsContainer = ({ children }: UserSheetsListProps) => {
  return (
    <div className="flex flex-col">
      <div className={`font-light text-2xl ${patrick.className} space-y-2`}>
        Your APIs
      </div>
      <div className="flex flex-col overflow-y-auto border-gray-300 py-2 max-h-96 max-w-sm space-y-4">
        {children}
      </div>
    </div>
  );
};
