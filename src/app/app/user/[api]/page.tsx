import { ApiExplorer } from "@/components/ApiExplorer";

type PageProps = {
  params: Promise<{ api: string; org: string }>;
};

export default async function Page({ params }: PageProps) {
  const { api, org } = await params;
  console.log(org);
  return <ApiExplorer apiName={api} />;
}
