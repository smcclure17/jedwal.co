import { ApiExplorer } from "@/components/ApiExplorer";

type PageProps = {
  params: Promise<{ api: string, user: string }>;
};

export default async function Page({ params }: PageProps) {
  const { api, user } = await params;
  console.log(user)
  return <ApiExplorer apiName={api} />;
}
