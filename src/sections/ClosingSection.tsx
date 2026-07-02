import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const footer = footerRef.current;
    if (!section || !card || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      const cols = footer.querySelectorAll('.footer-col');
      gsap.fromTo(
        cols,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    Shop: ['Women', 'Men', 'Kids', 'Baby', 'Sport', 'Loungewear'],
    Company: ['About', 'Sustainability', 'Careers', 'Press'],
    Support: ['Shipping', 'Returns', 'Size Guide', 'Contact'],
  };

  return (
    <div ref={sectionRef} className="relative bg-[#F4F4F2] pt-[8vh] pb-0" style={{ zIndex: 20 }}>
      <div className="flex justify-center px-4 sm:px-6">
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[920px] p-[clamp(28px,4vw,52px)] shadow-[0_18px_40px_rgba(0,0,0,0.08)] text-center"
        >
          <h2 className="text-display text-[#0B0B0B] text-[clamp(28px,5vw,64px)] mb-2">
            LifeWear.
          </h2>
          <h2 className="text-display text-[#0B0B0B] text-[clamp(28px,5vw,64px)] mb-6">
            Simple made better.
          </h2>
          <div className="w-16 h-1 bg-[#D12D2D] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-8 max-w-md mx-auto">
            Sign up for early access to drops, restocks, and style notes.
          </p>
          <button className="bg-[#D12D2D] text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-8 py-4 hover:bg-[#b52525] transition-colors">
            Join the list
          </button>
        </div>
      </div>

      <footer ref={footerRef} className="bg-white mt-16 pt-12 pb-8 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-col">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B0B0B] mb-4">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13px] text-[#6B6B6B] hover:text-[#D12D2D] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-col">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B0B0B] mb-4">
                Social
              </h4>
              <div className="flex items-center gap-4">
                <a href="#" className="text-[#6B6B6B] hover:text-[#D12D2D] transition-colors" aria-label="Instagram">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#6B6B6B] hover:text-[#D12D2D] transition-colors" aria-label="YouTube">
                  <Youtube size={20} strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#6B6B6B] hover:text-[#D12D2D] transition-colors" aria-label="Pinterest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4" />
                    <path d="M12 16l-2 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#6B6B6B]">
              &copy; UNIQLO Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B] transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B] transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
