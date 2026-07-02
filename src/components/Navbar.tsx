import { useEffect, useState, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  const navLinks = ['WOMEN', 'MEN', 'KIDS', 'BABY'];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-14 sm:h-16">
          <a href="#" className="flex items-center">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#D12D2D]">
              UNIQLO
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] font-semibold tracking-widest text-[#0B0B0B] hover:text-[#D12D2D] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-1 hover:text-[#D12D2D] transition-colors" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block p-1 hover:text-[#D12D2D] transition-colors" aria-label="Account">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="p-1 hover:text-[#D12D2D] transition-colors relative" aria-label="Shopping Bag">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D12D2D] text-white text-[9px] font-bold flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="md:hidden p-1 hover:text-[#D12D2D] transition-colors"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-white pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-2xl font-bold tracking-wide text-[#0B0B0B] py-3 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a href="#" className="text-lg font-medium text-[#6B6B6B] py-2 flex items-center gap-3">
              <User size={20} strokeWidth={1.5} />
              Account
            </a>
          </div>
        </div>
      )}
    </>
  );
}
