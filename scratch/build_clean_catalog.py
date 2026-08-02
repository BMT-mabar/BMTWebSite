import pypdf
import json
import re

reader = pypdf.PdfReader('./public/BMT-Products-Catalogue.pdf')

cat_map = {
    '50': "Women's Health",
    '51': 'Infectious Diseases',
    '52': 'Drugs of Abuse',
    '53': 'Tumor Markers',
    '54': 'Cardiac Markers',
    '55': 'Others'
}

# Specimen list in priority order
specimen_list = [
    'Breast Milk', 'Oral Fluid', 'Feces', 'Stain', 'Sperm', 'Powder',
    'WB / S / P', 'WB / S/ P', 'WB/ S/ P', 'WB/S/P', 'WB / S', 'WB / P', 'WB/P', 'WB/S', 'WB', 
    'Serum / Plasma', 'Serum/Plasma', 'S / P', 'S/P', 'S/P/U', 'Serum', 'Plasma',
    'Urine / Serum', 'Urine / WB / S / P', 'Urine', 
    'Swab / Nasopharyngeal Swab', 'Nasopharyngeal Swab', 'Swab / Nasal Swab', 'Nasal Swab', 'Throat Swab', 'Swab'
]

format_list = ['Cassette', 'Dipstick', 'Midstream', 'Device', 'Cup', 'Panel', 'Strip', 'Card']

items = []

for p_num in range(1, len(reader.pages) + 1):
    text = reader.pages[p_num - 1].extract_text()
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    for line in lines:
        m = re.match(r'^(\d{5})\s+(.+)$', line)
        if not m:
            continue
        
        cat_no = m.group(1)
        rest = m.group(2)
        
        # Category mapping
        prefix = cat_no[:2]
        category = cat_map.get(prefix, 'Others')
        if cat_no in ['51084', '51086', '51087', '51088', '51095']:
            category = 'Infectious Diseases'
            
        # Parse kit size
        kit_size = ''
        ks_match = re.search(r'(\d+\s*T.*|\d+T.*)$', rest, re.IGNORECASE)
        if ks_match:
            kit_size = ks_match.group(1).strip()
            rest_no_ks = rest[:ks_match.start()].strip()
        else:
            rest_no_ks = rest
            
        # Format
        fmt = ''
        for f in format_list:
            if re.search(r'\b' + f + r'\b', rest_no_ks, re.IGNORECASE):
                fmt = f
                break

        # Specimen override for known items
        spc = ''
        if cat_no in ['51084', '51086', '51087', '51088', '51095']:
            spc = 'Swab'
        else:
            for s in specimen_list:
                if s.lower() in rest_no_ks.lower():
                    spc = s
                    break
        
        if not spc:
            if 'urine' in rest.lower():
                spc = 'Urine'
            elif 'swab' in rest.lower():
                spc = 'Swab'
            elif 'feces' in rest.lower():
                spc = 'Feces'
            else:
                spc = 'WB / S / P'
                
        if not fmt:
            if 'cassette' in rest.lower():
                fmt = 'Cassette'
            elif 'dipstick' in rest.lower():
                fmt = 'Dipstick'
            elif 'midstream' in rest.lower():
                fmt = 'Midstream'
            elif 'cup' in rest.lower():
                fmt = 'Cup'
            elif 'panel' in rest.lower():
                fmt = 'Panel'
            else:
                fmt = 'Device'

        # Clean title: keep main product name
        title_en = rest_no_ks
        
        # Build clean Hebrew title
        title_he = title_en
        # Basic translations for standard patterns
        title_he = title_he.replace('Rapid Test', 'בדיקה מהירה')
        title_he = title_he.replace('Cassette', 'קסטה (Cassette)')
        title_he = title_he.replace('Dipstick', 'מקלון (Dipstick)')
        title_he = title_he.replace('Midstream', 'מקף (Midstream)')
        title_he = title_he.replace('Device', 'התקן')
        title_he = title_he.replace('Combo', 'משולב')
        title_he = title_he.replace('Pregnancy (hCG)', 'הריון (hCG)')
        title_he = title_he.replace('Strep A', 'סטראפ A')
        title_he = title_he.replace('Strep B', 'סטראפ B')
        title_he = title_he.replace('Influenza A+B', 'שפעת A+B')
        title_he = title_he.replace('Covid 19 Ag', 'קורונה Covid-19 Ag')

        items.append({
            'catNo': cat_no,
            'title': {
                'en': title_en,
                'he': title_he
            },
            'category': category,
            'specimen': spc,
            'format': fmt,
            'kitSize': kit_size if kit_size else '25 T'
        })

print(f'Successfully processed {len(items)} items.')

# Write JS file
js_content = f"// --- AUTOMATICALLY GENERATED COMPREHENSIVE BMT PDF CATALOGUE DATABASE ---\n// Total parsed items: {len(items)}\nconst fullCatalogDatabase = {json.dumps(items, indent=2, ensure_ascii=False)};\n\nexport default fullCatalogDatabase;\n"

with open('./src/data/fullCatalogDatabase.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Written fullCatalogDatabase.js successfully!')
