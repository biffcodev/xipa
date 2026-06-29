import type { Data } from "@measured/puck";
import { requireSession } from "@/lib/admin/session";
import { getVisualPage } from "@/lib/admin/store";
import Editor from "@/components/puck/Editor";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireSession();
  const { slug } = await params;
  const { title, data } = await getVisualPage(slug);
  return <Editor slug={slug} title={title} initialData={data as Data} />;
}
