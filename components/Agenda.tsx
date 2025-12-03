import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { EventCard } from './EventCard';
import { EventCategory, EventItem, EventDateFilter } from '../types';
import ALL_EVENTS from '../events.json';
import { addDays, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CATEGORIES, EVENT_DATE_FILTERS } from '../constants';
import { Search } from 'lucide-react';

import EVENTS from '../data';
const typedEvents: EventItem[] = EVENTS;

export const Agenda: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(EventCategory.ALL);
  const [selectedDateFilter, setSelectedDateFilter] = useState<EventDateFilter>(EventDateFilter.UPCOMING);
  const [searchTerm, setSearchTerm] = useState('');
  const visibleCategories = CATEGORIES.filter(c => c !== EventCategory.ALL);

  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);
  const next7End = addDays(today, 7);

  const normalizeDateLocal = (isoDateStr: string) => {
    const d = parseISO(isoDateStr);
    if (isNaN(d.getTime())) return d; // Invalid stays invalid
    d.setHours(0,0,0,0);
    return d;
  };

  const filteredEvents = typedEvents
    .filter(event => {
      const eventDate = normalizeDateLocal(event.date);

      if (isNaN(eventDate.getTime())) {
        console.warn(`Invalid date format for event ID: ${event.id}, date: ${event.date}`);
        return selectedDateFilter === EventDateFilter.UPCOMING;
      }

      const matchesCategory = selectedCategory === EventCategory.ALL || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDate = true;
      if (selectedDateFilter === EventDateFilter.UPCOMING) {
        matchesDate = eventDate.getTime() >= today.getTime();
      } else if (selectedDateFilter === EventDateFilter.TODAY) {
        matchesDate = isSameDay(eventDate, today);
      } else if (selectedDateFilter === EventDateFilter.TOMORROW) {
        matchesDate = isSameDay(eventDate, tomorrow);
      } else if (selectedDateFilter === EventDateFilter.DAY_AFTER_TOMORROW) {
        matchesDate = isSameDay(eventDate, dayAfterTomorrow);
      } else if (selectedDateFilter === EventDateFilter.NEXT_7_DAYS) {
        matchesDate = eventDate.getTime() >= today.getTime() && eventDate.getTime() <= next7End.getTime();
      } else if (selectedDateFilter === EventDateFilter.PAST) {
        matchesDate = eventDate.getTime() < today.getTime();
      }

      return matchesCategory && matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      const da = normalizeDateLocal(a.date).getTime();
      const db = normalizeDateLocal(b.date).getTime();
      const now = today.getTime();

      if (selectedDateFilter === EventDateFilter.PAST) {
        return db - da;
      }

      const aFuture = da >= now;
      const bFuture = db >= now;
      if (aFuture !== bFuture) return aFuture ? -1 : 1;

      const diffA = Math.abs(da - now);
      const diffB = Math.abs(db - now);
      if (diffA !== diffB) return diffA - diffB;

      if (da !== db) return da - db;
      return a.id.localeCompare(b.id);
    });

  return (
    <section id="agenda" className="py-20 bg-gradient-to-b from-navidad-cream via-navidad-cream to-navidad-cream/95 relative text-gray-800" style={{
      backgroundImage: `linear-gradient(135deg, rgba(212, 175, 55, 0.03) 0%, rgba(220, 20, 60, 0.02) 50%, rgba(212, 175, 55, 0.03) 100%), 
                         radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(220, 20, 60, 0.04) 0%, transparent 50%)`
    }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Agenda Navideña 2025" 
          subtitle="Explora la programación completa día a día."
        />

        {/* Controls */}
        <div className="flex flex-col gap-6 mb-10">
          {/* Date Filters (barra superior) */}
          <div className="flex flex-wrap justify-center gap-3 p-4 bg-gradient-to-r from-navidad-red/5 via-navidad-gold/5 to-navidad-red/5 rounded-2xl border-2 border-navidad-gold/20">
            {EVENT_DATE_FILTERS.map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedDateFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2
                  ${selectedDateFilter === filter.value
                    ? 'bg-gradient-to-r from-navidad-red to-navidad-red/80 text-white border-navidad-red shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-navidad-gold/40 hover:border-navidad-gold hover:text-navidad-red hover:shadow-md'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Categorías (segunda barra) */}
          <div className="flex flex-wrap justify-center gap-3 p-4 bg-gradient-to-r from-navidad-gold/5 via-navidad-red/5 to-navidad-gold/5 rounded-2xl border-2 border-navidad-gold/20">
            <button
              onClick={() => setSelectedCategory(EventCategory.ALL)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2
                ${selectedCategory === EventCategory.ALL 
                  ? 'bg-gradient-to-r from-navidad-gold to-navidad-gold/80 text-navidad-red border-navidad-gold shadow-lg scale-105 font-bold' 
                  : 'bg-white text-gray-700 border-navidad-gold/40 hover:border-navidad-gold hover:text-navidad-red hover:shadow-md'
                }`}
            >
              Todas las categorías
            </button>
            {visibleCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2
                  ${selectedCategory === category 
                    ? 'bg-gradient-to-r from-navidad-red to-navidad-red/80 text-white border-navidad-red shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-navidad-gold/40 hover:border-navidad-gold hover:text-navidad-red hover:shadow-md'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80 mx-auto">
            <input 
              type="text" 
              placeholder="🔍 Buscar evento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-navidad-gold/30 focus:outline-none focus:ring-2 focus:ring-navidad-gold focus:border-navidad-gold bg-white hover:border-navidad-gold transition-all shadow-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navidad-gold w-5 h-5" />
          </div>
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">❄️ No se encontraron eventos con estos criterios. ❄️</p>
          </div>
        )}
      </div>
    </section>
  );
};