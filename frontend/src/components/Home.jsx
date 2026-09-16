import Hero from "./Hero";
import AppLibrary from "./AppLibrary";
import DeveloperStrip from "./DeveloperStrip";

export default function Home({
  apps = [],
  loading = false,
  onUpload,
  onAppClick,
  onExplore,
}) {
  return (
    <main>

      {/* ======================================
          HERO
      ====================================== */}

      <Hero
        onExplore={onExplore}
        onUpload={onUpload}
      />


      {/* ======================================
          APPLICATION LIBRARY
      ====================================== */}

      <AppLibrary
        apps={apps}
        loading={loading}
        onOpenDetails={onAppClick}
      />


      {/* ======================================
          DEVELOPER STRIP
      ====================================== */}

      <DeveloperStrip
        onUpload={onUpload}
      />

    </main>
  );
}