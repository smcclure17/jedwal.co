import { getUserData } from "@/data/fetching";

export default async function Page() {
  const user = await getUserData();
  return <>user: {JSON.stringify(user)}</>;
}
