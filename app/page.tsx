import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import ProjectsRail from "@/components/home/ProjectsRail";
import Choice from "@/components/home/Choice";
import Stats from "@/components/home/Stats";
import Manifesto from "@/components/home/Manifesto";
import Methodology from "@/components/home/Methodology";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <ProjectsRail />
      <Choice />
      <Stats />
      <Manifesto />
      <Methodology />
      <Team />
      <Newsletter />
    </main>
  );
}
