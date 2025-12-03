#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
from difflib import SequenceMatcher

def similarity_ratio(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def normalize(text):
    text = text.lower()
    text = text.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    text = text.replace('-', ' ').replace('_', ' ')
    return text.strip()

# Read events
with open('events.json', 'r', encoding='utf-8') as f:
    events = json.load(f)

# Get images
images = {}
for fname in os.listdir('Eventos'):
    if fname.lower().endswith(('.png', '.jpg', '.jpeg')):
        name = fname.replace('.jpg.png', '').replace('.png', '').replace('.jpg', '').strip()
        images[name] = f"./Eventos/{fname}"

# Map events to images
changes = 0
for event in events:
    event_id = event['id']
    title = event['title']
    
    if event_id in ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71']:
        best_match = None
        best_score = 0.4
        
        norm_title = normalize(title)
        
        for img_name, img_path in images.items():
            norm_img = normalize(img_name)
            score = similarity_ratio(norm_title, norm_img)
            
            if score > best_score:
                best_score = score
                best_match = img_path
        
        if best_match:
            old_image = event['image']
            event['image'] = best_match
            if old_image != best_match:
                changes += 1

# Write updated events
with open('events.json', 'w', encoding='utf-8') as f:
    json.dump(events, f, indent=2, ensure_ascii=False)

print(f"Actualizado: {changes} eventos")
