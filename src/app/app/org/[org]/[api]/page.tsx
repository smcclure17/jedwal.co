import { OrganizationsApiExplorer } from "@/components/ApiExplorer";

type PageProps = {
  params: Promise<{ api: string; org: string }>;
};

export default async function OrgPage({ params }: PageProps) {
  const { api, org } = await params;
  return <OrganizationsApiExplorer apiName={api} org={org} />;
}
