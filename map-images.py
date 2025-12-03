import json
import os
from pathlib import Path
from difflib import SequenceMatcher

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

# Create mapping: normalize names for comparison
def normalize_name(name):
    """Normalize name for comparison"""
    return name.lower().replace('-', ' ').replace('_', ' ').replace('.jpg.png', '').replace('.png', '').replace('.jpg', '').strip()

def similarity(a, b):
    """Calculate similarity ratio between two strings"""
    return SequenceMatcher(None, a, b).ratio()

# Track mappings
mappings = {}
unmapped_images = []
unmapped_events = []

# For each event, try to find a matching image
for event in events:
    event_title = event.get('title', '').lower()
    event_id = event.get('id', '')
    
    best_match = None
    best_score = 0.6  # Minimum similarity threshold
    
    for image_file in image_files:
        norm_image = normalize_name(image_file)
        score = similarity(event_title, norm_image)
        
        # Also check against normalized title
        norm_title = normalize_name(event_title)
        score2 = similarity(norm_title, norm_image)
        
        final_score = max(score, score2)
        
        if final_score > best_score:
            best_score = final_score
            best_match = image_file
    
    if best_match:
        image_path = f"./Eventos/{best_match}"
        mappings[event_id] = (event['title'], best_match, best_score)
        event['image'] = image_path
    else:
        unmapped_events.append((event_id, event['title']))

# Save updated events
with open(eventos_path, 'w', encoding='utf-8') as f:
    json.dump(events, f, indent=2, ensure_ascii=False)

# Report results
print(f"✅ Mapeados: {len(mappings)} eventos")
print(f"❌ Sin mapeo: {len(unmapped_events)} eventos")
print(f"\nDetalle de mapeos:")
for event_id, (title, image, score) in sorted(mappings.items()):
    print(f"  ID {event_id}: {title} -> {image} ({score:.1%})")

if unmapped_events:
    print(f"\n⚠️  Eventos sin imagen correspondiente:")
    for event_id, title in unmapped_events:
        print(f"  ID {event_id}: {title}")
