export default function Manifesto() {
  return (
    <section id="manifiesto" className="relative w-full h-[165vh] bg-bg0">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 md:px-16">
        <span className="block text-xs tracking-[0.22em] uppercase text-muted font-semibold mb-8">El manifiesto</span>
        <h2 className="m-0 font-extrabold text-[clamp(40px,7vw,72px)] leading-[1.05] max-w-[1100px] tracking-[-0.03em]">
          <span className="text-brand">Reducir.</span> <span className="text-brand2">Rediseñar.</span> <span className="text-brand3">Repensar.</span> <span className="text-fg">Reutilizar.</span>
        </h2>
        <p className="mt-10 text-muted text-xl font-light">Cuatro principios, una misión.</p>
        <p className="mt-3.5 mx-auto text-fg text-2xl font-normal max-w-[740px] leading-[1.4]">Inspirarnos con otros para re-evolucionar el plástico y convertirlo en una oportunidad para el planeta.</p>
      </div>
    </section>
  );
}
