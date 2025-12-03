import json
import os
from pathlib import Path

eventos_path = "events.json"
eventos_folder = "Eventos"

# Load events
with open(eventos_path, 'r', encoding='utf-8') as f:
    events = json.load(f)

# Get all image files
image_files = []
for file in os.listdir(eventos_folder):
    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
        image_files.append(file)

# Manual mapping based on event titles and image names
manual_mapping = {
    "52": "los buenos demonios",
    "53": "marinas y flores",
    "54": "proyeccion de cortos",
    "55": "tertulia literaria",
    "56": "concierto trio de cañas",
    "57": "hora de la risa",
    "58": "green wolf",
    "59": "universo flamenco irene serranilla",
    "60": "fiestas honor nuestra señora inmaculada",
    "61": "tango y flamenco",
    "62": "cuenta cuentos para adulto",
    "63": "martes de cine tres amigas",
    "64": "jolis brel",
    "65": "conferencia la zarzuela",
    "66": "aznavour",
    "67": "richard ray farrell",
    "68": "un paseo por la historia",
    "69": "martes de cine muy lejos",
    "70": "presentacion de novela el administrador",
    "71": "love flamenco",
    "34": "maravillosos tenors",
    "35": "fiesta infantil de comercio",
    "36": "merienda tradicional",
    "37": "certamen postales",
    "38": "certamen villancicos",
    "39": "villancicos",
    "40": "papa noel",
    "41": "video mapping",
    "42": "fiesta de navidad ortigoso",
    "43": "blue moons especial",
    "44": "luz de belen",
    "45": "navidad aire libre",
    "46": "pasacalles",
    "47": "pasacalles",
    "48": "pasacalles",
    "49": "encuentro de bandas",
    "50": "joven banda",
    "51": "concierto de reyes",
    "23": "mundo magico",
    "24": "aladdin",
    "15": "ballet",
    "16": "taller navideño",
    "17": "sophie sings",
    "14": "muestra de belenes",
    "22": "carrera san silvestre",
    "25": "concierto aire",
}

def find_image(search_term):
    """Find image file that matches search term"""
    search_term = search_term.lower().replace(' ', '').replace('-', '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    
    best_match = None
    best_score = 0
    
    for image_file in image_files:
        # Normalize file name
        norm_file = image_file.lower().replace(' ', '').replace('-', '').replace('.jpg.png', '').replace('.png', '').replace('.jpg', '')
        norm_file = norm_file.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
        
        # Check if search term is in file
        if search_term in norm_file or norm_file in search_term:
            score = len(search_term) if search_term in norm_file else len(norm_file)
            if score > best_score:
                best_score = score
                best_match = image_file
    
    return best_match

# Map images to events
updated_count = 0
for event in events:
    event_id = event.get('id', '')
    event_title = event.get('title', '').lower()
    
    # Check manual mapping first
    if event_id in manual_mapping:
        search_term = manual_mapping[event_id]
        image_file = find_image(search_term)
        if image_file:
            event['image'] = f"./Eventos/{image_file}"
            updated_count += 1
            print(f"✅ ID {event_id}: {event['title'][:40]} -> {image_file}")
        else:
            print(f"⚠️  ID {event_id}: No se encontró imagen para '{search_term}'")
    else:
        # Try to match with title
        image_file = find_image(event_title)
        if image_file and not event['image'].startswith('./Eventos/evento'):
            event['image'] = f"./Eventos/{image_file}"
            updated_count += 1
            print(f"✅ ID {event_id}: {event['title'][:40]} -> {image_file}")

# Save updated events
with open(eventos_path, 'w', encoding='utf-8') as f:
    json.dump(events, f, indent=2, ensure_ascii=False)

print(f"\n📊 Total actualizado: {updated_count} eventos")
