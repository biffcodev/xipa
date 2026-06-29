import { notFound } from "next/navigation";
import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { methodologySteps as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  { type: "group", label: "Paso", fields: [
    { name: "badge", label: "Etiqueta (badge)", type: "text" },
    { name: "title", label: "Título", type: "text" },
    { name: "text", label: "Texto", type: "textarea" },
  ] },
  { type: "group", label: "Imagen", fields: [{ name: "image", label: "Imagen", type: "image" }] },
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = Number(id);
  const def = defaults.find((m) => m.order === order);
  if (!def) notFound();
  const doc = (await getDoc(`method-${id}`)) as Record<string, unknown> | null;
  const data = {
    _id: `method-${id}`,
    _type: "methodologyStep",
    order,
    badge: (doc?.badge as string) ?? def.badge,
    title: (doc?.title as string) ?? def.title,
    text: (doc?.text as string) ?? def.text,
    image: doc?.image ?? def.image,
  };
  return <DocEditor doc={data} title={`Metodología: ${def.title}`} viewHref="/metodologia" blocks={blocks} />;
}
