import React from 'react';
import { SectionTitle } from './SectionTitle';
import { EventCard } from './EventCard';
import { EventItem } from '../types';
import ALL_EVENTS from '../events.json';
import { parseISO } from 'date-fns';

import EVENTS from '../data';
const typedEvents: EventItem[] = EVENTS;

const today = new Date();
today.setHours(0, 0, 0, 0);

const normalizeDateLocal = (isoDateStr: string) => {
  const d = parseISO(isoDateStr);
  if (isNaN(d.getTime())) return d;
  d.setHours(0, 0, 0, 0);
  return d;
};

const getBaseTitleForDeduplication = (title: string): string => {
  return title
    .replace(/\s*-\s*\d+\s*(DIC|ENE).*$/i, '')
    .replace(/\s*\(\d+\)\s*$/i, '')
    .trim();
};

export const FeaturedEvents: React.FC = () => {
  const featuredFiltered = typedEvents.filter(e => e.isFeatured);
  
  const seenFeaturedTitles = new Set<string>();
  const featured = featuredFiltered
    .filter(e => {
      const baseTitle = getBaseTitleForDeduplication(e.title);
      if (seenFeaturedTitles.has(baseTitle)) return false;
      seenFeaturedTitles.add(baseTitle);
      return true;
    })
    .slice(0, 4);

  const upcomingFiltered = typedEvents
    .filter(e => {
      const d = normalizeDateLocal(e.date);
      if (isNaN(d.getTime())) return false;
      return d.getTime() >= today.getTime();
    })
    .sort((a, b) => normalizeDateLocal(a.date).getTime() - normalizeDateLocal(b.date).getTime());

  const featuredBaseTitles = new Set<string>();
  featured.forEach(e => {
    featuredBaseTitles.add(getBaseTitleForDeduplication(e.title));
  });

  const seenTitles = new Set<string>();
  const upcoming = upcomingFiltered
    .filter(e => {
      const baseTitle = getBaseTitleForDeduplication(e.title);
      if (seenTitles.has(baseTitle) || featuredBaseTitles.has(baseTitle)) return false;
      seenTitles.add(baseTitle);
      return true;
    })
    .slice(0, 4);

  return (
    <section id="featured" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Eventos Destacados" 
          subtitle="Los momentos imperdibles de esta Navidad en la costa."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <SectionTitle 
          title="Próximos eventos" 
          subtitle="Los cuatro eventos más cercanos en el calendario."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcoming.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-20 opacity-5 pointer-events-none">
         <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#781d26" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.3C59.4,45.5,47.9,54.2,35.6,60.7C23.3,67.2,10.2,71.5,-2.1,75.1C-14.4,78.8,-25.9,81.8,-36.8,75.9C-47.7,70,-58,55.2,-65.4,39.6C-72.8,24,-77.3,7.6,-76.6,-8.6C-75.9,-24.8,-70,-40.8,-59.2,-53C-48.4,-65.2,-32.7,-73.6,-17.3,-76.3C-1.9,-79,13.2,-76,30.5,-83.6" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};