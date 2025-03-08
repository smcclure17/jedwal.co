import { ApiExplorer } from "@/components/ApiExplorer";

type PageProps = {
  params: Promise<{ api: string; org: string }>;
};

export default async function Page({ params }: PageProps) {
  const { api } = await params;
  return <ApiExplorer apiName={api} />;
}
