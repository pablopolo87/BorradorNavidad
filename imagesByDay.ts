// Mapa de imagenes por día del mes basado en nombres como "6 fotos carrusel.png", "10 fotos carrusel.png", etc.
// Detecta automáticamente estos archivos y expone un mapa day (1..31) -> url

const dayImages = import.meta.glob('./Eventos/*.{png,PNG,jpg,JPG,jpeg,JPEG}', {
  eager: true,
  as: 'url'
}) as Record<string, string>;

const IMAGES_BY_DAY = new Map<number, string>();

for (const [key, url] of Object.entries(dayImages)) {
  const parts = key.split(/[\\/]/);
  const filename = parts[parts.length - 1].toLowerCase();
  // Excluir cualquier archivo que contenga la palabra "carrusel"
  if (filename.includes('carrusel')) continue;

  // Patrones admitidos: por ejemplo "6.png", "10.jpg", "06.jpeg" o con texto adicional
  // Capturamos un día (1..31) al inicio del nombre, opcionalmente con espacios o guiones, y una extensión válida
  const m = filename.match(/^(\d{1,2})[\s_-]?.*\.(png|jpg|jpeg)$/i);
  if (m) {
    const day = parseInt(m[1], 10);
    if (!Number.isNaN(day) && day >= 1 && day <= 31) {
      IMAGES_BY_DAY.set(day, url);
    }
  }
}

export default IMAGES_BY_DAY;
