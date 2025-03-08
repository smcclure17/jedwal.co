import { NotFoundScreen } from "@/components/NotFoundScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Jedwal",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return <NotFoundScreen />;
}