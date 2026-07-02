import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const micro = microRef.current;
    if (!section || !image || !headline || !card || !micro) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.3 });
      loadTl
        .fromTo(image, { opacity: 0, scale: 1.06, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' })
        .fromTo(headline, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .fromTo(micro, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.5')
        .fromTo(card, { opacity: 0, x: 120, scale: 0.98 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.5');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([image, headline, card, micro], { opacity: 1, x: 0, y: 0, scale: 1 });
          },
        },
      });

      scrollTl
        .fromTo(image, { x: 0, scale: 1, opacity: 1 }, { x: '-18vw', scale: 1.06, opacity: 0.25, ease: 'power2.in' }, 0.70)
        .fromTo(image, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99)
        .fromTo(headline, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0.3, ease: 'power2.in' }, 0.70)
        .fromTo(headline, { opacity: 0.3 }, { opacity: 0, duration: 0.01 }, 0.99)
        .fromTo(card, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0.25, ease: 'power2.in' }, 0.70)
        .fromTo(card, { opacity: 0.25 }, { opacity: 0, duration: 0.01 }, 0.99)
        .fromTo(micro, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F4F2] overflow-hidden z-10"
    >
      <div
        ref={microRef}
        className="absolute left-[2.2vw] top-1/2 -translate-y-1/2 -rotate-90 text-micro text-[#6B6B6B] tracking-[0.12em] z-20 opacity-0"
      >
        LIFEWEAR
      </div>

      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[10vh] w-[62vw] h-[80vh] overflow-hidden opacity-0"
      >
        <img
          src="/images/hero_model.jpg"
          alt="Editorial fashion"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={headlineRef}
        className="absolute left-[10vw] top-[14vh] max-w-[34vw] z-20 opacity-0"
      >
        <h1 className="text-display text-white text-[clamp(32px,5vw,72px)] drop-shadow-lg">
          Simple made better.
        </h1>
      </div>

      <div
        ref={cardRef}
        className="absolute right-[6vw] bottom-[10vh] w-[30vw] min-w-[300px] max-w-[420px] min-h-[28vh] bg-white p-[clamp(18px,2vw,28px)] shadow-[0_18px_40px_rgba(0,0,0,0.10)] z-20 opacity-0"
      >
        <p className="text-micro text-[#6B6B6B] mb-3">NEW ARRIVALS</p>
        <h2 className="text-display text-[#0B0B0B] text-[clamp(20px,2.5vw,36px)] mb-4">
          The new essentials.
        </h2>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
          Clean lines, modern fabrics, designed to move with your day.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button className="bg-[#D12D2D] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 hover:bg-[#b52525] transition-colors">
            Shop new arrivals
          </button>
          <a href="#" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B0B0B] underline underline-offset-4 decoration-[#D12D2D] hover:text-[#D12D2D] transition-colors">
            Explore the collection
          </a>
        </div>
      </div>
    </div>
  );
}
