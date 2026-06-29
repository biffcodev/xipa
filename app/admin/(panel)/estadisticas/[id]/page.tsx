import { notFound } from "next/navigation";
import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { stats as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  { type: "group", label: "Dato", fields: [
    { name: "value", label: "Número", type: "number" },
    { name: "unit", label: "Unidad", type: "text", help: "Ej: %, Mt, años" },
    { name: "label", label: "Etiqueta", type: "text" },
    { name: "desc", label: "Descripción", type: "textarea" },
  ] },
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = Number(id);
  const def = defaults.find((s) => s.order === order);
  if (!def) notFound();
  const doc = (await getDoc(`stat-${id}`)) as Record<string, unknown> | null;
  const data = {
    _id: `stat-${id}`,
    _type: "stat",
    order,
    value: (doc?.value as number) ?? def.value,
    unit: (doc?.unit as string) ?? def.unit,
    label: (doc?.label as string) ?? def.label,
    desc: (doc?.desc as string) ?? def.desc,
  };
  return <DocEditor doc={data} title={`Estadística: ${def.label}`} viewHref="/" blocks={blocks} />;
}
