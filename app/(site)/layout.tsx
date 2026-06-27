import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <ThemeProvider>
      <I18nProvider>
        <Nav />
        {children}
        <Footer settings={settings} />
      </I18nProvider>
    </ThemeProvider>
  );
}
