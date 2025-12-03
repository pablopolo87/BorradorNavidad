const fs = require('fs');
const path = require('path');

const eventImageMap = {
  1: 'evento 1.png',
  2: 'evento 1.png',
  3: 'evento 3.png',
  4: 'evento 1.png',
  5: 'evento 5.png',
  6: 'evento 6.png',
  7: 'evento 7.png',
  8: 'evento 8.png',
  9: 'evento 9.png',
  10: 'evento 10.png',
  11: 'evento 11.png',
  12: 'evento 12.png',
  13: 'evento 13.png',
  14: 'evento 10.png',
  15: 'evento 13.png',
  16: 'evento 10.png',
  17: 'evento 12.png',
  18: 'evento 9.png',
  19: 'evento 8.png',
  20: 'evento 11.png',
  21: 'evento 6.png',
  22: 'evento 9.png',
  23: 'evento 7.png',
  24: 'evento 8.png',
  25: 'evento 10.png',
  26: 'evento 12.png',
  27: 'evento 5.png',
  28: 'evento 13.png',
  29: 'evento 11.png',
  30: 'evento 6.png',
  31: 'evento 9.png',
  32: 'evento 7.png',
  33: 'evento 10.png'
};

const eventsPath = path.join(__dirname, 'events.json');
const eventos = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

eventos.forEach(event => {
  const eventId = parseInt(event.id);
  if (eventImageMap[eventId]) {
    event.image = `./Eventos/${eventImageMap[eventId]}`;
  }
});

fs.writeFileSync(eventsPath, JSON.stringify(eventos, null, 2), 'utf8');
console.log('✓ Imágenes mapeadas exitosamente');
