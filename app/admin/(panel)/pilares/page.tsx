import { getByType } from "@/lib/admin/store";
import { pillars as defaults } from "@/lib/defaults";
import CollectionList, { prevUrl, type ListItem } from "@/components/admin/CollectionList";

export const dynamic = "force-dynamic";

type Doc = { _id: string; order?: number; title?: string; image?: unknown };

export default async function Page() {
  const docs = await getByType<Doc>("pillar");
  const items: ListItem[] =
    docs.length > 0
      ? docs.map((d) => ({ href: `/admin/pilares/${d.order ?? d._id.replace("pillar-", "")}`, title: d.title || "Pilar", img: prevUrl(d.image) }))
      : defaults.map((p) => ({ href: `/admin/pilares/${p.order}`, title: p.title, img: p.image }));
  return <CollectionList title="Pilares" intro="Los cuatro pilares: Reducir, Rediseñar, Repensar, Reutilizar." items={items} />;
}
