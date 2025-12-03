export enum EventDateFilter {
  UPCOMING = 'upcoming',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  DAY_AFTER_TOMORROW = 'day_after_tomorrow',
  NEXT_7_DAYS = 'next_7_days',
  PAST = 'past',
}

export enum EventCategory {
  ALL = 'Todos',
  MUSIC = 'Música y Conciertos',
  THEATER = 'Teatro y Danza',
  FAMILY = 'Familiar e Infantil',
  TRADITION = 'Tradición Local',
  GASTRONOMY = 'Gastronomía',
  RELIGIOUS = 'Actos Religiosos',
  UPCOMING = 'Próximos Eventos'
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO format or display string
  endDate?: string; // ISO format for multi-day events
  time: string;
  location: string;
  description: string;
  descriptionExtended?: string; // New field for more detailed description
  image: string;
  category: EventCategory;
  isFeatured?: boolean;
  price?: string;
  carouselImages?: string[]; // New field for carousel images
}

export interface NavItem {
  label: string;
  href: string;
}