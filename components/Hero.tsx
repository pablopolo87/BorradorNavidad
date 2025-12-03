import React from 'react';
import { ArrowDown } from 'lucide-react';
import heroImage from '../ALUMBRADO-NAVIDEÑO-EN-PLAZA-CONSTITTUCION-ALMUÑECAR-16.jpg';
import logoAlmunecar from '../Eventos/logo-almunecar.png';

const Snowflakes: React.FC = () => {
  const snowflakes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 5,
    size: 4 + Math.random() * 6,
    opacity: 0.3 + Math.random() * 0.6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute rounded-full bg-white animate-snowfall"
          style={{
            left: `${snowflake.left}%`,
            top: '-10px',
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            animation: `snowfall ${snowflake.duration}s linear ${snowflake.delay}s infinite`,
            boxShadow: `0 0 ${snowflake.size}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Alumbrado Navideño en la Plaza de la Constitución de Almuñécar" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navidad-red/40 via-transparent to-navidad-red/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Snowflakes */}
      <Snowflakes />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center mt-20">
        <div className="flex justify-center mb-6 animate-fade-in">
          <img
            src={logoAlmunecar}
            alt="Logo Almuñécar"
            className="h-20 w-20 object-contain"
          />
        </div>

        <div className="inline-block mb-4 animate-fade-in">
             <span className="px-4 py-1 border border-white/50 rounded-full text-white text-sm uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md">
                Agenda Oficial
             </span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-fade-in animate-pulse-glow"
          style={{
            textShadow: `
              4px 4px 0px rgba(0, 0, 0, 0.5),
              8px 8px 0px rgba(198, 124, 78, 0.3),
              -2px -2px 0px rgba(255, 255, 255, 0.2),
              2px 2px 10px rgba(0, 0, 0, 0.8),
              0px 0px 20px rgba(212, 175, 55, 0.6),
              0px 0px 40px rgba(212, 175, 55, 0.4)
            `,
            letterSpacing: '0.05em',
            animation: 'pulse-glow 3s ease-in-out infinite, float 4s ease-in-out infinite',
          }}>
          Navidad Cultural <br />
          <span className="text-navidad-gold italic block mt-2"
            style={{
              textShadow: `
                3px 3px 0px rgba(0, 0, 0, 0.5),
                6px 6px 0px rgba(255, 255, 255, 0.2),
                1px 1px 8px rgba(0, 0, 0, 0.8),
                0px 0px 15px rgba(212, 175, 55, 0.8),
                0px 0px 30px rgba(220, 20, 60, 0.4)
              `,
              animation: 'pulse-glow-gold 2.5s ease-in-out infinite 0.5s',
            }}>
            en Almuñécar 2025
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in opacity-90"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}>
          Vive la magia de los eventos navideños, entre luces y sueños, la ciudad cobra vida...
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
          <a href="#agenda" className="px-8 py-4 bg-navidad-gold text-navidad-red font-bold rounded-lg shadow-lg hover:bg-white hover:scale-105 transition-all duration-300">
            Ver Agenda Completa
          </a>
          <a href="#traditions" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Nuestras Tradiciones
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80">
        <ArrowDown className="w-8 h-8" />
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 
              4px 4px 0px rgba(0, 0, 0, 0.5),
              8px 8px 0px rgba(198, 124, 78, 0.3),
              -2px -2px 0px rgba(255, 255, 255, 0.2),
              2px 2px 10px rgba(0, 0, 0, 0.8),
              0px 0px 10px rgba(212, 175, 55, 0.3),
              0px 0px 20px rgba(212, 175, 55, 0.1);
          }
          50% {
            text-shadow: 
              4px 4px 0px rgba(0, 0, 0, 0.5),
              8px 8px 0px rgba(198, 124, 78, 0.3),
              -2px -2px 0px rgba(255, 255, 255, 0.2),
              2px 2px 10px rgba(0, 0, 0, 0.8),
              0px 0px 30px rgba(212, 175, 55, 0.8),
              0px 0px 60px rgba(212, 175, 55, 0.6),
              0px 0px 90px rgba(220, 20, 60, 0.3);
          }
        }

        @keyframes pulse-glow-gold {
          0%, 100% {
            text-shadow: 
              3px 3px 0px rgba(0, 0, 0, 0.5),
              6px 6px 0px rgba(255, 255, 255, 0.2),
              1px 1px 8px rgba(0, 0, 0, 0.8),
              0px 0px 10px rgba(212, 175, 55, 0.5),
              0px 0px 20px rgba(220, 20, 60, 0.2);
          }
          50% {
            text-shadow: 
              3px 3px 0px rgba(0, 0, 0, 0.5),
              6px 6px 0px rgba(255, 255, 255, 0.2),
              1px 1px 8px rgba(0, 0, 0, 0.8),
              0px 0px 25px rgba(212, 175, 55, 1),
              0px 0px 50px rgba(212, 175, 55, 0.8),
              0px 0px 80px rgba(220, 20, 60, 0.5);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
};
