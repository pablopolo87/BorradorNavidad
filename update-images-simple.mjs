import fs from 'fs';

const imageMap = {
  '1': './Eventos/evento 1.png',
  '2': './Eventos/evento 1.png',
  '3': './Eventos/evento 3.png',
  '4': './Eventos/evento 1.png',
  '5': './Eventos/evento 5.png',
  '6': './Eventos/evento 6.png',
  '7': './Eventos/evento 7.png',
  '8': './Eventos/evento 8.png',
  '9': './Eventos/evento 9.png',
  '10': './Eventos/evento 10.png',
  '11': './Eventos/evento 11.png',
  '12': './Eventos/evento 12.png',
  '13': './Eventos/evento 13.png',
  '14': './Eventos/evento 10.png',
  '15': './Eventos/evento 13.png',
  '16': './Eventos/evento 10.png',
  '17': './Eventos/evento 12.png',
  '18': './Eventos/evento 9.png',
  '19': './Eventos/evento 8.png',
  '20': './Eventos/evento 11.png',
  '21': './Eventos/evento 6.png',
  '22': './Eventos/evento 9.png',
  '23': './Eventos/evento 7.png',
  '24': './Eventos/evento 8.png',
  '25': './Eventos/evento 10.png',
  '26': './Eventos/evento 12.png',
  '27': './Eventos/evento 5.png',
  '28': './Eventos/evento 13.png',
  '29': './Eventos/evento 11.png',
  '30': './Eventos/evento 6.png',
  '31': './Eventos/evento 9.png',
  '32': './Eventos/evento 7.png',
  '33': './Eventos/evento 10.png'
};

const data = fs.readFileSync('events.json', 'utf-8');
const events = JSON.parse(data);

events.forEach(event => {
  if (imageMap[event.id]) {
    event.image = imageMap[event.id];
  }
});

fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
console.log('✓ Imágenes actualizadas correctamente');
