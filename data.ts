import ALL_EVENTS from './events.json';
import type { EventItem } from './types';
import overrides from './image-overrides.json';

// Carga masiva de imágenes desde la carpeta "Eventos".
// Vite resolverá estas rutas y devolverá URLs listas para usar en <img src>.
const images = import.meta.glob('./Eventos/*.{png,PNG,jpg,JPG,jpeg,JPEG}', {
  eager: true,
  as: 'url'
}) as Record<string, string>;

// Construye un mapa id -> url a partir del patrón de nombre de archivo: "evento 1.png", "eventos 10.png", etc.
const idToUrl = new Map<string, string>();
for (const [key, url] of Object.entries(images)) {
  // Obtiene solo el nombre de archivo
  const parts = key.split(/[\\/]/);
  const filename = parts[parts.length - 1].toLowerCase();
  // Busca patrones: "evento 1.png", "eventos 1.png", con cualquier extensión
  const match = filename.match(/^eventos?\s*(\d+)\.(png|jpg|jpeg)$/i);
  if (match) {
    const id = match[1];
    idToUrl.set(id, url);
  }
}

// Mapa manual: id -> filename (en carpeta ./Eventos)
const manual: Record<string, string> = (overrides as Record<string, string>) || {};
const filenameToUrl = new Map<string, string>();
for (const [key, url] of Object.entries(images)) {
  const parts = key.split(/[\\/]/);
  filenameToUrl.set(parts[parts.length - 1], url);
}

let EVENTS: EventItem[] = (ALL_EVENTS as EventItem[]).map((e) => {
  // 1) Si hay override manual, úsalo
  const manualFilename = manual[e.id];
  if (manualFilename) {
    const url = filenameToUrl.get(manualFilename) || filenameToUrl.get(manualFilename.toLowerCase());
    if (url) return { ...e, image: url };
  }
  // 2) Si no, intenta por id
  const byId = idToUrl.get(e.id);
  return byId ? { ...e, image: byId } : e;
});





// Auditoría en consola (solo informativa)
try {
  const eventIds = new Set((EVENTS as EventItem[]).map(e => e.id));
  const matchedIds = new Set<string>();
  for (const [id] of idToUrl.entries()) matchedIds.add(id);

  const missingImage = (EVENTS as EventItem[])
    .filter(e => !matchedIds.has(e.id))
    .map(e => e.id);

  const orphanImages: string[] = [];
  for (const [id, url] of idToUrl.entries()) {
    if (!eventIds.has(id)) orphanImages.push(`${id}: ${url}`);
  }

  if (missingImage.length)
    console.warn('[IMAGEN-EVENTO] Eventos sin imagen local:', missingImage);
  if (orphanImages.length)
    console.warn('[IMAGEN-EVENTO] Imágenes locales sin evento (id no encontrado):', orphanImages);
} catch {}

export default EVENTS;
