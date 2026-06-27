import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import ProjectsRail from "@/components/home/ProjectsRail";
import Choice from "@/components/home/Choice";
import Stats from "@/components/home/Stats";
import Manifesto from "@/components/home/Manifesto";
import Methodology from "@/components/home/Methodology";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";
import { getHome, getMethodologySteps, getPillars, getProjects, getStats, getTeam } from "@/lib/content";

export default async function Home() {
  const [home, pillars, stats, team, steps, projects] = await Promise.all([
    getHome(), getPillars(), getStats(), getTeam(), getMethodologySteps(), getProjects(),
  ]);
  return (
    <main>
      <Hero slides={home.heroSlides} />
      <Pillars pillars={pillars} />
      <ProjectsRail projects={projects} outro={home.railOutro} />
      <Choice data={home.choice} />
      <Stats intro={home.stats} stats={stats} />
      <Manifesto data={home.manifesto} />
      <Methodology intro={home.methodologyIntro} steps={steps} />
      <Team intro={home.teamIntro} members={team} />
      <Newsletter data={home.newsletter} />
    </main>
  );
}
