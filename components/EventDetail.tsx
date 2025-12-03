import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ALL_EVENTS from '../events.json';
import { EventItem } from '../types';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { parseISO, format } from 'date-fns';
import IMAGES_BY_DAY from '../imagesByDay';

// Explicitly type the imported JSON data
import EVENTS from '../data';
const typedEvents: EventItem[] = EVENTS;

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = typedEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-navidad-cream text-center">
        <h2 className="text-3xl font-serif text-navidad-red mb-4">Evento no encontrado</h2>
        <p className="text-gray-600 mb-8">El evento que buscas no existe o ha sido movido.</p>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 bg-navidad-gold text-navidad-red font-bold rounded-lg shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Volver a la Agenda
        </Link>
      </div>
    );
  }

  const parsed = parseISO(event.date);
  const formattedDate = isNaN(parsed.getTime()) ? event.date : format(parsed, 'dd-MM-yyyy');
  const dayOfMonth = isNaN(parsed.getTime()) ? undefined : parsed.getDate();
  const dayImage = dayOfMonth ? IMAGES_BY_DAY.get(dayOfMonth) : undefined;

  return (
    <div className="bg-navidad-cream min-h-screen font-sans">
      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-navidad-gold transition-colors duration-300"
            >
              <ArrowLeft size={18} />
              Volver a la agenda
            </Link>
          </div>

          {/* Event Content */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <img 
              src={event.image} 
              alt={`Imagen de ${event.title}`}
              className="w-full h-64 md:h-96 object-cover" 
            />
            <div className="p-6 md:p-10">
              <span className="px-3 py-1 bg-navidad-red/10 text-navidad-red text-sm font-bold rounded-full">{event.category}</span>
              
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 my-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {dayImage && (
                    <img src={dayImage} alt={`Imagen del día ${dayOfMonth}`} className="w-8 h-8 object-cover rounded-md border border-gray-200" />
                  )}
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">{event.time}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Almuñécar, España')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-navidad-gold transition-colors"
                >
                  <MapPin size={18} />
                  <span className="font-medium">{event.location}</span>
                </a>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{event.descriptionExtended || event.description}</p>
              </div>

              {event.price && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                   <p className="text-2xl font-bold text-navidad-gold text-center">{event.price}</p>
                </div>
              )}

              {/* Carousel Section (Placeholder for now) */}
              {event.carouselImages && event.carouselImages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Galería de Imágenes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.carouselImages.map((imageSrc, index) => (
                      <img 
                        key={index} 
                        src={imageSrc} 
                        alt={`${event.title} - ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* End Carousel Section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
