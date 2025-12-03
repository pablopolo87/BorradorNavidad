import React from 'react';
import { SectionTitle } from './SectionTitle';
import { Anchor, Fish, Music } from 'lucide-react';

export const Traditions: React.FC = () => {
  return (
    <section id="traditions" className="py-20 bg-navidad-green text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Tradición Costera en Navidad" 
          subtitle="Una Navidad diferente, bañada por el Mediterráneo."
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="bg-navidad-gold w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-lg text-navidad-red">
                    <Anchor className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-navidad-gold">Belén Marinero</h3>
                <p className="text-gray-200 leading-relaxed">
                    Cada año, nuestros artesanos recrean el nacimiento en un entorno único: barcas de pesca antiguas, redes y arena de nuestras playas, honrando a nuestra patrona la Virgen de la Antigua.
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="bg-navidad-gold w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-lg text-navidad-red">
                    <Fish className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-navidad-gold">Gastronomía Sexitana</h3>
                <p className="text-gray-200 leading-relaxed">
                   La Nochebuena en Almuñécar sabe a mar. No faltan los mangos y chirimoyas tropicales en el postre, acompañando a los tradicionales roscos fritos y pestiños de la abuela.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="bg-navidad-gold w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-lg text-navidad-red">
                    <Music className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-navidad-gold">Zambombá y Mar</h3>
                <p className="text-gray-200 leading-relaxed">
                    Las plazas se llenan de hogueras y cante. La brisa marina se mezcla con el sonido de las zambombas y guitarras en una celebración comunitaria que dura hasta el amanecer.
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};