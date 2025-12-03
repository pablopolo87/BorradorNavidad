import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventItem } from '../types';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = (() => {
    // If event has endDate, show range or "durante todo el mes"
    if (event.endDate && event.time === 'Durante todo el mes') {
      return 'Durante todo el mes';
    } else if (event.endDate) {
      const start = parseISO(event.date);
      const end = parseISO(event.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        return `${format(start, 'dd/MM')} - ${format(end, 'dd/MM/yyyy')}`;
      }
    }
    // Default case
    const d = parseISO(event.date);
    return isNaN(d.getTime()) ? event.date : format(d, 'dd-MM-yyyy');
  })();
  return (
    <Link to={`/evento/${event.id}`} className="group bg-gradient-to-br from-white via-navidad-cream/40 to-navidad-gold/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-navidad-gold/30 hover:border-navidad-gold flex flex-col h-full relative" style={{
      backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 250, 240, 0.7) 50%, rgba(212, 175, 55, 0.08) 100%)`
    }}>
      <div className="absolute -top-2 -left-2 w-10 h-10 text-navidad-gold opacity-40 group-hover:opacity-80 transition-opacity" style={{fontSize: '2rem'}}>✦</div>
      <div className="absolute -top-2 -right-2 w-10 h-10 text-navidad-red opacity-30 group-hover:opacity-70 transition-opacity" style={{fontSize: '1.5rem'}}>•</div>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-navidad-gold text-navidad-red font-bold px-3 py-1 rounded-full text-sm shadow-md">
          {event.price}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <span className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-navidad-red to-navidad-red/80 px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            {event.category}
        </span>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-sm text-white font-bold mb-3 pb-2 px-3 py-1.5 bg-gradient-to-r from-navidad-red to-navidad-red/80 rounded-lg inline-flex">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-gray-800 mb-3 group-hover:text-navidad-red transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>
        
        <div className="space-y-3 mt-auto">
          <div className="flex flex-col gap-2 border-t-2 border-navidad-gold/30 pt-3">
             <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-navidad-gold transition-colors">
               <Clock className="w-3.5 h-3.5 text-navidad-red" /> 
               <span>{event.time}</span>
             </div>
             <a 
               href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Almuñécar, España')}`}
               target="_blank"
               rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               className="flex items-center gap-2 text-xs text-gray-600 hover:text-navidad-gold transition-colors"
             >
               <MapPin className="w-3.5 h-3.5 text-navidad-red" /> 
               <span>{event.location}</span>
             </a>
          </div>
        </div>
      </div>
    </Link>
  );
};
