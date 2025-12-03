import os
import json

folder = "Eventos"
files = sorted([f for f in os.listdir(folder) if f.lower().endswith('.png')])

print("IMAGENES DISPONIBLES:")
for i, f in enumerate(files, 1):
    print(f"{i:3}. {f}")

print(f"\nTotal: {len(files)} imágenes")

# Load events
with open('events.json', 'r', encoding='utf-8') as f:
    events = json.load(f)

print(f"\nEVENTOS A MAPEAR (sin foto nueva):")
for event in events:
    if event['id'] in ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71']:
        print(f"ID {event['id']:2}: {event['title']}")
