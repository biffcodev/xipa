import { getByType } from "@/lib/admin/store";
import { methodologySteps as defaults } from "@/lib/defaults";
import CollectionList, { prevUrl, type ListItem } from "@/components/admin/CollectionList";

export const dynamic = "force-dynamic";

type Doc = { _id: string; order?: number; title?: string; badge?: string; image?: unknown };

export default async function Page() {
  const docs = await getByType<Doc>("methodologyStep");
  const items: ListItem[] =
    docs.length > 0
      ? docs.map((d) => ({ href: `/admin/metodologia/${d.order ?? d._id.replace("method-", "")}`, title: d.title || "Paso", sub: d.badge, img: prevUrl(d.image) }))
      : defaults.map((m) => ({ href: `/admin/metodologia/${m.order}`, title: m.title, sub: m.badge, img: m.image }));
  return <CollectionList title="Metodología" intro="Los pasos del proceso circular." items={items} />;
}
