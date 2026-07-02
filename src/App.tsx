import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import StatementCard from './sections/StatementCard';
import PanelRack from './sections/PanelRack';
import CollageFeature from './sections/CollageFeature';
import ClosingSection from './sections/ClosingSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      const globalSnap = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

      return () => {
        globalSnap.kill();
      };
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <StatementCard
          micro="NEW ACCESSORIES"
          headline="Finish the look."
          body="Bags, belts, and minimal layers—designed to complement, not compete."
          ctaPrimary="Shop accessories"
          ctaSecondary="See the edit"
          zIndex={11}
          entranceDirection="bottom"
        />
        <PanelRack
          micro="COLLECTION"
          headline="Soft layers. Easy mornings."
          caption="Lounge sets in cotton-modal blends."
          images={['/images/lounge_01.jpg', '/images/lounge_02.jpg', '/images/lounge_03.jpg']}
          zIndex={12}
        />
        <StatementCard
          micro="TAILORING"
          headline="Structure, simplified."
          body="One-button blazers, relaxed shoulders, clean pockets—polish without the pressure."
          ctaPrimary="Shop blazers"
          ctaSecondary="View the guide"
          zIndex={13}
          entranceDirection="right"
          showHairline={true}
        />
        <PanelRack
          micro="COLLECTION"
          headline="Tailored comfort."
          caption="Lightweight fabrics that hold their shape."
          images={['/images/blazer_01.jpg', '/images/blazer_02.jpg']}
          zIndex={14}
        />
        <StatementCard
          micro="MODERN CLASSICS"
          headline="Made to mix."
          body="Neutrals that pair with everything. Fits that feel effortless."
          ctaPrimary="Shop modern classics"
          ctaSecondary="Read the story"
          zIndex={15}
          entranceDirection="bottom"
          thumbnail="/images/linentees_01.jpg"
          thumbnailPosition="right"
        />
        <PanelRack
          micro="COLLECTION"
          headline="Breathe easy."
          caption="Linen and cotton jerseys for warmer days."
          images={['/images/linentees_01.jpg', '/images/linentees_02.jpg', '/images/linentees_03.jpg']}
          zIndex={16}
        />
        <StatementCard
          micro="ESSENTIALS"
          headline="Everyday, elevated."
          body="Underwear and basics built with soft support and clean finishes."
          ctaPrimary="Shop essentials"
          ctaSecondary="Explore fabrics"
          zIndex={17}
          entranceDirection="left"
          thumbnail="/images/bras_01.jpg"
          thumbnailPosition="left"
        />
        <PanelRack
          micro="COLLECTION"
          headline="Support, simply."
          caption="Wireless bras with smooth, clean lines."
          images={['/images/bras_01.jpg', '/images/bras_02.jpg']}
          zIndex={18}
        />
        <CollageFeature
          images={['/images/collage_a.jpg', '/images/collage_b.jpg', '/images/collage_c.jpg']}
          featureImage="/images/feature_linen.jpg"
          headline="Linen, lived in."
          body="Light, breathable, easy to care for—linen made for real routines."
          cta="Shop linen"
          zIndex={19}
        />
        <ClosingSection />
      </main>
    </div>
  );
}

export default App;
