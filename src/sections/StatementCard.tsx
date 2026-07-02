import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatementCardProps {
  micro: string;
  headline: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  zIndex: number;
  entranceDirection?: 'bottom' | 'left' | 'right';
  showHairline?: boolean;
  thumbnail?: string;
  thumbnailPosition?: 'left' | 'right';
}

export default function StatementCard({
  micro,
  headline,
  body,
  ctaPrimary,
  ctaSecondary,
  zIndex,
  entranceDirection = 'bottom',
  showHairline = false,
  thumbnail,
  thumbnailPosition = 'right',
}: StatementCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const underline = underlineRef.current;
    const headlineEl = headlineRef.current;
    const bodyEl = bodyRef.current;
    const thumb = thumbRef.current;
    const hairline = hairlineRef.current;
    if (!section || !card || !underline || !headlineEl || !bodyEl) return;

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

      const entranceX = entranceDirection === 'left' ? '-55vw' : entranceDirection === 'right' ? '55vw' : '0';
      const entranceY = entranceDirection === 'bottom' ? '60vh' : '0';
      const entranceRotate = entranceDirection === 'left' ? -1.5 : entranceDirection === 'right' ? 1.5 : 0;

      scrollTl
        .fromTo(card, { opacity: 0, x: entranceX, y: entranceY, scale: 0.96, rotate: entranceRotate }, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, ease: 'none' }, 0)
        .fromTo(underline, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.1)
        .fromTo(headlineEl, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none' }, 0.08)
        .fromTo(bodyEl, { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'none' }, 0.15);

      if (hairline) {
        scrollTl.fromTo(hairline, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.05);
      }

      if (thumb) {
        scrollTl.fromTo(thumb, { opacity: 0, x: thumbnailPosition === 'right' ? 40 : -40, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, ease: 'none' }, 0.18);
      }

      const exitX = entranceDirection === 'left' ? '-55vw' : entranceDirection === 'right' ? '55vw' : '0';
      const exitY = entranceDirection === 'bottom' ? '24vh' : '0';

      scrollTl
        .fromTo(card, { y: 0, x: 0, scale: 1, opacity: 1 }, { y: exitY, x: exitX, scale: 0.985, opacity: 0.25, ease: 'power2.in' }, 0.70)
        .fromTo(card, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99);
    }, section);

    return () => ctx.revert();
  }, [entranceDirection, thumbnailPosition]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F4F2] flex items-center justify-center overflow-hidden"
      style={{ zIndex }}
    >
      <div
        ref={cardRef}
        className="relative bg-white w-[min(720px,78vw)] p-[clamp(28px,3.6vw,44px)] shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
      >
        {showHairline && (
          <div ref={hairlineRef} className="hairline mb-6 origin-left" />
        )}

        <p className="text-micro text-[#6B6B6B] mb-4">{micro}</p>

        <h2
          ref={headlineRef}
          className="text-display text-[#0B0B0B] text-[clamp(28px,4vw,56px)] mb-4"
        >
          {headline}
        </h2>

        <div ref={underlineRef} className="w-16 h-1 bg-[#D12D2D] mb-6 origin-left" />

        <div ref={bodyRef} className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1">
            <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-8">
              {body}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button className="bg-[#D12D2D] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 hover:bg-[#b52525] transition-colors">
                {ctaPrimary}
              </button>
              <a
                href="#"
                className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B0B0B] underline underline-offset-4 decoration-[#D12D2D] hover:text-[#D12D2D] transition-colors"
              >
                {ctaSecondary}
              </a>
            </div>
          </div>

          {thumbnail && (
            <div
              ref={thumbRef}
              className={`w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] flex-shrink-0 ${
                thumbnailPosition === 'left' ? 'order-first' : ''
              }`}
            >
              <img
                src={thumbnail}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
