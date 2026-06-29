import { getByType } from "@/lib/admin/store";
import { stats as defaults } from "@/lib/defaults";
import CollectionList, { type ListItem } from "@/components/admin/CollectionList";

export const dynamic = "force-dynamic";

type Doc = { _id: string; order?: number; value?: number; unit?: string; label?: string };

export default async function Page() {
  const docs = await getByType<Doc>("stat");
  const items: ListItem[] =
    docs.length > 0
      ? docs.map((d) => ({ href: `/admin/estadisticas/${d.order ?? d._id.replace("stat-", "")}`, title: `${d.value ?? ""}${d.unit ?? ""}`, sub: d.label }))
      : defaults.map((s) => ({ href: `/admin/estadisticas/${s.order}`, title: `${s.value}${s.unit}`, sub: s.label }));
  return <CollectionList title="Estadísticas" intro="Los números del problema del plástico." items={items} />;
}
