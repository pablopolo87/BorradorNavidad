import React from 'react';
import saludoImg from '../saludo.jpg';
import { SectionTitle } from './SectionTitle';

export const Greeting: React.FC = () => {
  return (
    <div id="saludo" className="bg-navidad-cream min-h-screen font-sans">
      <div className="container mx-auto px-4 py-10 md:py-20">
        <SectionTitle 
          title="Saludo del Alcalde"
          subtitle="Unas palabras de nuestro alcalde y el concejal de cultura para estas fiestas."
        />
        <div className="mt-8 max-w-4xl mx-auto">
          <img 
            src={saludoImg} 
            alt="Saludo del Alcalde y Concejal de Cultura" 
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
