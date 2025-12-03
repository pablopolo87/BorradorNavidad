import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const pdf = pdfModule.default || pdfModule;

// Ruta al PDF fuente
const PDF_PATH = path.resolve('Programación Cultural 2025.pdf');

// Directorio de salida
const OUT_DIR = path.resolve('data');
const OUT_TEXT = path.join(OUT_DIR, 'pdf-text.txt');
const OUT_JSON = path.join(OUT_DIR, 'events-from-pdf.json');

// Meses en español a índice (0-based)
const MONTHS = {
  'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
  'julio': 6, 'agosto': 7, 'septiembre': 8, 'setiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11,
  'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
};

function normalizeSpaces(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function extractDate(line) {
  // Ejemplos: "3 de diciembre", "03 diciembre", "3-12-2025", "2025-12-03"
  const l = line.toLowerCase();
  // ISO yyyy-mm-dd
  let m = l.match(/(20\d{2})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
  if (m) {
    const [_, y, mo, d] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    if (!isNaN(date.getTime())) return date;
  }
  // d de mes (es)
  m = l.match(/(\d{1,2})(?:\s*(?:de|\s))\s*([a-záéíóúñ\.]{3,})/i);
  if (m) {
    const d = Number(m[1]);
    const monKey = m[2].replace(/\./g, '').toLowerCase();
    const mon = MONTHS[monKey];
    if (!isNaN(d) && mon != null) {
      const year = 2025; // fijo para campaña
      const date = new Date(year, mon, d);
      if (!isNaN(date.getTime())) return date;
    }
  }
  // d-m o d/m (asumir año 2025)
  m = l.match(/\b(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?/);
  if (m) {
    const d = Number(m[1]);
    const mo = Number(m[2]);
    const y = m[3] ? Number(m[3]) : 2025;
    const year = y < 100 ? 2000 + y : y;
    const date = new Date(year, mo - 1, d);
    if (!isNaN(date.getTime())) return date;
  }
  return null;
}

function extractTime(line) {
  // Ejemplos: "19:30", "11:00 a 13:00", "Desde 19:30"
  const times = [];
  const re = /(\d{1,2}:\d{2})/g;
  let m;
  while ((m = re.exec(line)) !== null) times.push(m[1]);
  if (times.length === 1) return times[0];
  if (times.length >= 2) return `${times[0]} a ${times[1]}`;
  // Palabras clave
  if (/mañana/i.test(line)) return null;
  return null;
}

function guessCategory(text) {
  const t = text.toLowerCase();
  if (/\bmúsica|concierto|orquesta|gala|coro|flamenc|rock|pop|lírica|lrica/i.test(t)) return 'Música y Conciertos';
  if (/\bteatro|danza|ballet|musical|función/i.test(t)) return 'Teatro y Danza';
  if (/\binfantil|familiar|niñ|cabalgata|cartero real|taller/i.test(t)) return 'Familiar e Infantil';
  if (/\bprocesión|belen(es)?|parroquia|iglesia|acto(s)? religioso(s)?/i.test(t)) return 'Actos Religiosos';
  if (/\bgastronomía|degustación|tapa|vino|buñuelada/i.test(t)) return 'Gastronomía';
  if (/\bmercadillo|tradición|zambomba|encendido|navidad|adviento|escaparates/i.test(t)) return 'Tradición Local';
  return 'Próximos Eventos';
}

function extractLocation(line) {
  // Busca lugares comunes
  const locRe = /(Auditorio\s+[\wÁÉÍÓÚÑ\s]+|Parque\s+[\wÁÉÍÓÚÑ\s]+|Plaza\s+[\wÁÉÍÓÚÑ\s]+|Castillo\s+[\wÁÉÍÓÚÑ\s]+|Paseo\s+[\wÁÉÍÓÚÑ\s]+|Casa de la Cultura|Parroquia\s+[\wÁÉÍÓÚÑ\s]+|Estadio\s+[\wÁÉÍÓÚÑ\s]+)/i;
  const m = line.match(locRe);
  return m ? normalizeSpaces(m[0]) : null;
}

function extractPrice(lines) {
  const joined = lines.join(' ');
  const m = joined.match(/(Precio\s*:\s*[^.\n]+|Donativo\s*\d+\s*€|Entrada\s*gratuita|Gratuito\.?)/i);
  return m ? normalizeSpaces(m[0]) : undefined;
}

function parseBlocks(text) {
  // Separar por líneas y agrupar en bloques por dobles saltos de línea
  const lines = text.split(/\r?\n/).map(l => normalizeSpaces(l)).filter(l => l.length);
  const blocks = [];
  let current = [];
  for (const line of lines) {
    if (/^[*_\-]{5,}$/.test(line)) { // separadores fuertes
      if (current.length) blocks.push(current), current = [];
      continue;
    }
    if (current.length && /^(Fecha|Día|Horario|Lugar|Precio)\b/i.test(line)) {
      current.push(line);
      continue;
    }
    // Heurística: si línea muy larga o mayúsculas -> posible título o descripción
    if (current.length && /\s{2,}/.test(line)) {
      current.push(line);
    } else {
      // Inicio de nuevo bloque si la línea parece un título en mayúsculas prolongadas
      if (current.length && /[A-ZÁÉÍÓÚÑ]{3,}/.test(line) && line === line.toUpperCase()) {
        blocks.push(current);
        current = [line];
      } else {
        current.push(line);
      }
    }
  }
  if (current.length) blocks.push(current);
  return blocks;
}

function blockToEvent(block, idx) {
  const title = block[0] || `Evento PDF ${idx+1}`;
  let date = null;
  let time = null;
  let location = null;
  let descParts = [];

  for (const line of block) {
    if (!date) {
      const d = extractDate(line);
      if (d) date = d;
    }
    if (!time) {
      const t = extractTime(line);
      if (t) time = t;
    }
    if (!location) {
      const loc = extractLocation(line);
      if (loc) location = loc;
    }
    descParts.push(line);
  }

  const description = normalizeSpaces(descParts.join(' '));
  const price = extractPrice(block);
  const category = guessCategory(description + ' ' + title);

  const toIso = (d) => d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : '2025-12-01';

  return {
    id: `pdf-${idx+1}`,
    title: normalizeSpaces(title),
    date: toIso(date),
    time: time || '-',
    location: location || '-',
    description,
    image: '',
    category,
    price,
  };
}

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error('No se encuentra el PDF en', PDF_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const buffer = fs.readFileSync(PDF_PATH);
  const data = await pdf(buffer);
  const text = data.text;

  fs.writeFileSync(OUT_TEXT, text, 'utf8');

  const blocks = parseBlocks(text);
  const events = blocks.map((b, i) => blockToEvent(b, i));

  fs.writeFileSync(OUT_JSON, JSON.stringify(events, null, 2), 'utf8');
  console.log(`Extraído texto a ${OUT_TEXT}`);
  console.log(`Generado borrador de eventos a ${OUT_JSON} (${events.length} candidatos)`);
}

main().catch(err => { console.error(err); process.exit(1); });
