import React from 'react';
import { Facebook, Instagram, Twitter, Palmtree, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navidad-red text-white pt-16 pb-8 border-t-4 border-navidad-gold">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <Palmtree className="text-navidad-gold w-8 h-8" />
               <h3 className="font-serif text-2xl font-bold">Almuñécar</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Agenda Cultural Oficial de Navidad 2025. <br/>
              Promoviendo la cultura y tradición en Almuñécar y La Herradura.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navidad-gold hover:text-navidad-red transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navidad-gold hover:text-navidad-red transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navidad-gold hover:text-navidad-red transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-navidad-gold">Eventos</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Conciertos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Teatro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Infantil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exposiciones</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-navidad-gold">Información</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Oficina de Turismo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mapa de la ciudad</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-navidad-gold">Mantente al día</h4>
            <p className="text-sm text-white/80 mb-4">Recibe la agenda semanal en tu correo.</p>
            <form className="flex flex-col gap-2">
               <div className="relative">
                 <input 
                   type="email" 
                   placeholder="Tu email..." 
                   className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-navidad-gold"
                 />
                 <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
               </div>
               <button type="button" className="bg-navidad-gold text-navidad-red text-sm font-bold py-2 rounded hover:bg-white transition-colors">
                 Suscribirse
               </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
           <p>&copy; “2025 Agenda Cultural Almuñécar. Todos los derechos reservados. Diseño conceptual: <a href="Pablojlopezfernandez@gmail.com" className="underline hover:text-white">
      Pablo López Fdez
    </a>”</p>
        </div>
      </div>
    </footer>
  );
};
