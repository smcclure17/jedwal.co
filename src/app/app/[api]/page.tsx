import { ApiExplorer } from "@/components/ApiExplorer";

export default async function App({ params }: { params: { api: string } }) {
  return <ApiExplorer apiName={params.api} />;
}
