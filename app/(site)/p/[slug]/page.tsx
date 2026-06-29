import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Data } from "@measured/puck";
import { getVisualPage, visualPageExists } from "@/lib/admin/store";
import PuckRender from "@/components/puck/PuckRender";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { title } = await getVisualPage(slug);
  return { title: `${title} · XIPA` };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await visualPageExists(slug))) notFound();
  const { data } = await getVisualPage(slug);
  return <PuckRender data={data as Data} />;
}
