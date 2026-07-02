import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PanelRackProps {
  micro: string;
  headline: string;
  caption: string;
  images: string[];
  zIndex: number;
}

export default function PanelRack({ micro, headline, caption, images, zIndex }: PanelRackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const micro = microRef.current;
    const headline = headlineRef.current;
    const caption = captionRef.current;
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !micro || !headline || !caption || panels.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl
        .fromTo(micro, { opacity: 0, y: -20 }, { opacity: 1, y: 0, ease: 'none' }, 0)
        .fromTo(headline, { opacity: 0, x: '-18vw' }, { opacity: 1, x: 0, ease: 'none' }, 0.02);

      if (panels.length === 3) {
        panels.forEach((panel, i) => {
          scrollTl.fromTo(
            panel,
            { opacity: 0, y: '80vh', scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, ease: 'none' },
            0.04 + i * 0.04
          );
        });
      } else {
        scrollTl
          .fromTo(panels[0], { opacity: 0, x: '-60vw' }, { opacity: 1, x: 0, ease: 'none' }, 0.04)
          .fromTo(panels[1], { opacity: 0, x: '60vw' }, { opacity: 1, x: 0, ease: 'none' }, 0.06);
      }

      scrollTl.fromTo(caption, { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none' }, 0.2);

      panels.forEach((panel) => {
        scrollTl.fromTo(
          panel,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0.25, ease: 'power2.in' },
          0.70
        );
        scrollTl.fromTo(panel, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99);
      });

      scrollTl
        .fromTo(headline, { x: 0, opacity: 1 }, { x: '-6vw', opacity: 0.35, ease: 'power2.in' }, 0.70)
        .fromTo(micro, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
        .fromTo(caption, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.78);
    }, section);

    return () => ctx.revert();
  }, [images.length]);

  const isThreePanel = images.length === 3;

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F4F2] overflow-hidden"
      style={{ zIndex }}
    >
      <div
        ref={microRef}
        className="absolute left-1/2 -translate-x-1/2 top-[6vh] text-micro text-[#6B6B6B]"
      >
        {micro}
      </div>

      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[10vh] text-display text-[#0B0B0B] text-[clamp(24px,3.5vw,48px)] max-w-[46vw]"
      >
        {headline}
      </h2>

      <div className="absolute top-[18vh] left-0 right-0 h-[72vh] flex gap-[2vw] px-[6vw]">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { panelsRef.current[i] = el; }}
            className={`h-full overflow-hidden ${
              isThreePanel ? 'flex-1' : i === 0 ? 'w-[42vw]' : 'flex-1'
            }`}
          >
            <img
              src={img}
              alt={`Collection ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        ref={captionRef}
        className="absolute left-[6vw] bottom-[4vh] flex items-center gap-2"
      >
        <span className="w-2 h-2 bg-[#D12D2D]" />
        <p className="text-xs text-[#6B6B6B] tracking-wide">{caption}</p>
      </div>
    </div>
  );
}
