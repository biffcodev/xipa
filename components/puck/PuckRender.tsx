"use client";
import { Render, type Data } from "@measured/puck";
import { config } from "@/lib/puck/config";

export default function PuckRender({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
