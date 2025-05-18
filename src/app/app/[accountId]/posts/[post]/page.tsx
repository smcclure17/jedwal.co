import { DocApiExplorer } from "@/components/DocApiExplorer";

type PageProps = {
  params: Promise<{ post: string; accountId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { post, accountId } = await params;
  return <DocApiExplorer apiName={post} accountId={accountId} />;
}
