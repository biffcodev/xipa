import { getByType } from "@/lib/admin/store";
import { team as defaults } from "@/lib/defaults";
import CollectionList, { prevUrl, type ListItem } from "@/components/admin/CollectionList";

export const dynamic = "force-dynamic";

type Doc = { _id: string; order?: number; name?: string; role?: string; photo?: unknown };

export default async function Page() {
  const docs = await getByType<Doc>("teamMember");
  const items: ListItem[] =
    docs.length > 0
      ? docs.map((d) => ({
          href: `/admin/equipo/${d.order ?? d._id.replace("team-", "")}`,
          title: d.name || "Integrante",
          sub: d.role,
          img: prevUrl(d.photo),
        }))
      : defaults.map((m) => ({ href: `/admin/equipo/${m.order}`, title: m.name, sub: m.role, img: m.image }));
  return <CollectionList title="Equipo" intro="Editá los integrantes del equipo." items={items} />;
}
