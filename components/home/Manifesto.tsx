import { homeContent } from "@/lib/defaults";

const COLOR: Record<string, string> = { brand: "text-brand", brand2: "text-brand2", brand3: "text-brand3", fg: "text-fg" };
type Data = typeof homeContent.manifesto;

export default function Manifesto({ data = homeContent.manifesto }: { data?: Data }) {
  return (
    <section id="manifiesto" className="relative w-full h-[165vh] bg-bg0">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 md:px-16">
        <span className="block text-xs tracking-[0.22em] uppercase text-muted font-semibold mb-8">{data.eyebrow}</span>
        <h2 className="m-0 font-extrabold text-[clamp(40px,7vw,72px)] leading-[1.05] max-w-[1100px] tracking-[-0.03em]">
          {data.words?.map((w, i) => (
            <span key={i} className={COLOR[w.color] || "text-fg"}>{w.text}{i < data.words.length - 1 ? " " : ""}</span>
          ))}
        </h2>
        <p className="mt-10 text-muted text-xl font-light">{data.sub}</p>
        <p className="mt-3.5 mx-auto text-fg text-2xl font-normal max-w-[740px] leading-[1.4]">{data.body}</p>
      </div>
    </section>
  );
}
