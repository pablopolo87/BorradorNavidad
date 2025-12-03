import React from 'react';
import { SectionTitle } from './SectionTitle';
import { EventCard } from './EventCard';
import { EventItem } from '../types';
import EVENTS from '../data';

// Selecciona siempre los 2 eventos fijos de participación de comercios
// Identificados por título (más robusto que id si cambian ids)
const PARTICIPACION_TITLES = new Set([
  'CONCURSO DE ESCAPARATES',
  'CALENDARIO DE ADVIENTO',
]);

const participacionEvents: EventItem[] = (EVENTS as EventItem[])
  .filter(e => PARTICIPACION_TITLES.has(e.title.toUpperCase()))
  // orden consistente por título
  .sort((a, b) => a.title.localeCompare(b.title));

export const Participacion: React.FC = () => {
  if (participacionEvents.length === 0) return null;
  return (
    <section id="participacion" className="py-20 bg-navidad-cream">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Participación Comercios"
          subtitle="Actividades vigentes durante todo el mes"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {participacionEvents.map(e => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
};
