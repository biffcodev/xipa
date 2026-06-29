import { notFound } from "next/navigation";
import DocEditor, { type Block } from "@/components/admin/DocEditor";
import { getDoc } from "@/lib/admin/store";
import { team as defaults } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const blocks: Block[] = [
  { type: "group", label: "Datos", fields: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "role", label: "Rol", type: "text" },
    { name: "bio", label: "Biografía", type: "textarea" },
    { name: "linkedin", label: "LinkedIn (link)", type: "url" },
  ] },
  { type: "group", label: "Foto", fields: [{ name: "photo", label: "Foto", type: "image" }] },
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = Number(id);
  const def = defaults.find((m) => m.order === order);
  if (!def) notFound();
  const doc = (await getDoc(`team-${id}`)) as Record<string, unknown> | null;
  const data = {
    _id: `team-${id}`,
    _type: "teamMember",
    order,
    name: (doc?.name as string) ?? def.name,
    role: (doc?.role as string) ?? def.role,
    bio: (doc?.bio as string) ?? def.bio,
    linkedin: (doc?.linkedin as string) ?? def.linkedin,
    photo: doc?.photo ?? def.image,
  };
  return (
    <DocEditor doc={data} title={`Equipo: ${def.name}`} viewHref="/equipo" blocks={blocks} />
  );
}
