import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CollageFeatureProps {
  images: string[];
  featureImage: string;
  headline: string;
  body: string;
  cta: string;
  zIndex: number;
}

export default function CollageFeature({
  images,
  featureImage,
  headline,
  body,
  cta,
  zIndex,
}: CollageFeatureProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const collage = collageRef.current;
    const feature = featureRef.current;
    const overlay = overlayRef.current;
    if (!section || !collage || !feature || !overlay) return;

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
        .fromTo(collage, { opacity: 0, x: '-40vw' }, { opacity: 1, x: 0, ease: 'none' }, 0)
        .fromTo(feature, { opacity: 0, x: '60vw', scale: 1.04 }, { opacity: 1, x: 0, scale: 1, ease: 'none' }, 0.02)
        .fromTo(overlay, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none' }, 0.12);

      scrollTl
        .fromTo(feature, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0.25, ease: 'power2.in' }, 0.70)
        .fromTo(feature, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99)
        .fromTo(collage, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0.25, ease: 'power2.in' }, 0.70)
        .fromTo(collage, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99)
        .fromTo(overlay, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F4F2] overflow-hidden"
      style={{ zIndex }}
    >
      <div
        ref={collageRef}
        className="absolute left-[6vw] top-[10vh] w-[18vw] min-w-[120px] h-[80vh] flex flex-col gap-[2vh]"
      >
        {images.map((img, i) => (
          <div key={i} className="flex-1 overflow-hidden">
            <img
              src={img}
              alt={`Collage ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        ref={featureRef}
        className="absolute left-[28vw] top-[10vh] w-[66vw] h-[80vh] overflow-hidden"
      >
        <img
          src={featureImage}
          alt="Feature"
          className="w-full h-full object-cover"
        />

        <div
          ref={overlayRef}
          className="absolute left-[2vw] bottom-[6vh] max-w-[38vw] min-w-[260px] bg-white/90 backdrop-blur-sm p-5 sm:p-6"
        >
          <h3 className="text-display text-[#0B0B0B] text-[clamp(18px,2.5vw,36px)] mb-3">
            {headline}
          </h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">
            {body}
          </p>
          <button className="bg-[#D12D2D] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 hover:bg-[#b52525] transition-colors">
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}
