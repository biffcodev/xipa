import Link from "next/link";

/* Presentational blocks used by the visual editor (Puck) and the public render.
   Pure/server-safe (no client hooks) and styled with the XIPA design tokens so
   they always look on-brand. */

const container = "mx-auto w-full max-w-6xl px-6";

function alignCls(a?: string) {
  return a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";
}

export function HeadingBlock({ text, level = "h2", align }: { text?: string; level?: string; align?: string }) {
  const cls = {
    h1: "text-4xl sm:text-5xl font-bold tracking-tight",
    h2: "text-3xl sm:text-4xl font-bold tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold tracking-tight",
  }[level || "h2"];
  const Tag = (level === "h1" ? "h1" : level === "h3" ? "h3" : "h2") as "h1" | "h2" | "h3";
  return (
    <div className={`${container} py-4`}>
      <Tag className={`${cls} ${alignCls(align)} text-fg`}>{text}</Tag>
    </div>
  );
}

export function TextBlock({ text, align, size }: { text?: string; align?: string; size?: string }) {
  const sz = size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-base";
  return (
    <div className={`${container} py-3`}>
      <p className={`${sz} ${alignCls(align)} whitespace-pre-line leading-relaxed text-muted`}>{text}</p>
    </div>
  );
}

export function HeroBlock({
  eyebrow,
  title,
  subtitle,
  image,
  buttonText,
  buttonUrl,
  height = "lg",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
  height?: string;
}) {
  const h = height === "sm" ? "min-h-[42vh]" : height === "full" ? "min-h-screen" : "min-h-[66vh]";
  return (
    <section className={`relative flex ${h} items-center overflow-hidden`}>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
      <div className={`${container} relative py-20`}>
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>}
        {title && <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">{title}</h1>}
        {subtitle && <p className="mt-5 max-w-xl text-lg text-white/85">{subtitle}</p>}
        {buttonText && (
          <Link href={buttonUrl || "#"} className="mt-7 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

export function ImageBlock({ image, caption, rounded }: { image?: string; caption?: string; rounded?: boolean }) {
  return (
    <figure className={`${container} py-6`}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={caption || ""} className={`w-full object-cover ${rounded ? "rounded-2xl" : ""}`} />
      ) : (
        <div className="grid h-64 place-items-center rounded-2xl bg-bg2 text-sm text-muted">Imagen</div>
      )}
      {caption && <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function ColumnsBlock({
  title,
  text,
  image,
  imageSide = "right",
}: {
  title?: string;
  text?: string;
  image?: string;
  imageSide?: string;
}) {
  return (
    <section className={`${container} py-10`}>
      <div className={`grid items-center gap-8 md:grid-cols-2 ${imageSide === "left" ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div>
          {title && <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{title}</h2>}
          {text && <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">{text}</p>}
        </div>
        <div>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-bg2 text-sm text-muted">Imagen</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function StatsBlock({ items = [] }: { items?: { value?: string; label?: string }[] }) {
  return (
    <section className={`${container} py-10`}>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map((s, i) => (
          <div key={i} className="rounded-xl border border-line2 bg-bg1 p-5 text-center">
            <div className="text-3xl font-bold text-brand">{s.value}</div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GalleryBlock({ images = [] }: { images?: { image?: string }[] }) {
  return (
    <section className={`${container} py-8`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((g, i) =>
          g.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={g.image} alt="" className="aspect-square w-full rounded-xl object-cover" />
          ) : (
            <div key={i} className="grid aspect-square place-items-center rounded-xl bg-bg2 text-xs text-muted">Imagen</div>
          ),
        )}
      </div>
    </section>
  );
}

export function CtaBlock({ title, text, buttonText, buttonUrl }: { title?: string; text?: string; buttonText?: string; buttonUrl?: string }) {
  return (
    <section className={`${container} py-10`}>
      <div className="rounded-3xl bg-brand px-8 py-12 text-center text-white">
        {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
        {text && <p className="mx-auto mt-3 max-w-xl text-white/90">{text}</p>}
        {buttonText && (
          <Link href={buttonUrl || "#"} className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

export function ButtonBlock({ text, url, variant = "solid", align }: { text?: string; url?: string; variant?: string; align?: string }) {
  const cls =
    variant === "outline"
      ? "border border-brand text-brand hover:bg-brand hover:text-white"
      : "bg-brand text-white hover:opacity-90";
  return (
    <div className={`${container} py-4 ${alignCls(align)}`}>
      <Link href={url || "#"} className={`inline-block rounded-full px-6 py-3 text-sm font-semibold transition ${cls}`}>
        {text || "Botón"}
      </Link>
    </div>
  );
}

export function SpacerBlock({ size = "md" }: { size?: string }) {
  const h = { sm: "h-6", md: "h-12", lg: "h-24", xl: "h-40" }[size || "md"];
  return <div className={h} />;
}
