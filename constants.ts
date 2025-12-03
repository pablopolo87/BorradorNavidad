import { EventCategory, EventItem, EventDateFilter } from './types';

export const CATEGORIES = [
  EventCategory.ALL,
  EventCategory.MUSIC,
  EventCategory.THEATER,
  EventCategory.FAMILY,
  EventCategory.TRADITION,
  EventCategory.GASTRONOMY
];

export const EVENT_DATE_FILTERS = [
  { label: 'Próximos Eventos', value: EventDateFilter.UPCOMING },
  { label: 'Hoy', value: EventDateFilter.TODAY },
  { label: 'Mañana', value: EventDateFilter.TOMORROW },
  { label: 'Próxima semana', value: EventDateFilter.NEXT_7_DAYS as unknown as EventDateFilter },
  { label: 'Eventos Pasados', value: EventDateFilter.PAST },
];
