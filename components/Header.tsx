import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoAlmunecar from '../Eventos/logo-almunecar.png';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Destacados', href: '/#featured' },
    { label: 'Participación', href: '/#participacion' },
    { label: 'Agenda Completa', href: '/#agenda' },
    { label: 'Tradiciones', href: '/#traditions' },
    { label: 'Saludo', href: '/saludo' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navidad-red/95 backdrop-blur-sm shadow-xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <img 
            src={logoAlmunecar} 
            alt="Logo Almuñécar" 
            className={`h-12 w-12 object-contain transition-all duration-300 ${isScrolled ? 'h-10 w-10' : 'h-12 w-12'}`}
          />
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-xl leading-none tracking-wide ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>
              ALMUÑÉCAR
            </span>
            <span className={`text-xs uppercase tracking-[0.2em] ${isScrolled ? 'text-navidad-gold' : 'text-navidad-cream drop-shadow-md'}`}>
              Navidad Cultural
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 relative group
                ${isScrolled ? 'text-white hover:text-navidad-gold' : 'text-white hover:text-navidad-gold drop-shadow-sm'}
              `}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-navidad-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-navidad-red shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-6' : 'max-h-0'}`}>
         <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-white font-serif text-lg hover:text-navidad-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
         </div>
      </div>
    </header>
  );
};
