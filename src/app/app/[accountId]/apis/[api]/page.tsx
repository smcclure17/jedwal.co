import { ApiExplorer } from "@/components/ApiExplorer";

type PageProps = {
  params: Promise<{ api: string; accountId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { api, accountId } = await params;
  return <ApiExplorer apiName={api} accountId={accountId} />;
}
