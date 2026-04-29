-- Create parts table with JSONB support for details
CREATE TABLE IF NOT EXISTS parts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bmw_model TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  image_placeholder TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('Excelentă', 'Foarte bună', 'Bună')),
  km INTEGER NOT NULL,
  details JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read all parts
CREATE POLICY "Allow public to read parts" ON parts
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to create parts
CREATE POLICY "Allow authenticated to create parts" ON parts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update parts
CREATE POLICY "Allow authenticated to update parts" ON parts
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete parts
CREATE POLICY "Allow authenticated to delete parts" ON parts
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO parts (id, name, bmw_model, price, description, image_placeholder, condition, km, details)
VALUES
  (
    'bmw-001',
    'Far LED Adaptiv',
    'G30',
    1850,
    'Far stânga LED adaptiv original BMW Seria 5 G30 (2017-2023). Stare excelentă, fără fisuri sau defecte. Include cablaj și modul de control.',
    'https://placehold.co/800x500/111827/e2b96f?text=Far+LED+Adaptiv+G30',
    'Foarte bună',
    62000,
    '{
      "category": "Iluminat",
      "oem_code": "63117214939",
      "manufacturing_year": "2019",
      "warranty": "30 zile",
      "compatible_with": ["BMW Seria 5 G30 2017-2020", "BMW Seria 5 G31 Touring"],
      "notes": "Include modul de control AHL și cablajul original. Testat înainte de livrare."
    }'::jsonb
  ),
  (
    'bmw-002',
    'Motor Diesel N57',
    'F10',
    8500,
    'Motor complet N57D30A 3.0d 258CP extras din BMW Seria 5 F10 xDrive. 112.000 km reali, verificabili. Include toate anexele. Garanție 60 zile.',
    'https://placehold.co/800x500/111827/e2b96f?text=Motor+N57D30A',
    'Bună',
    112000,
    '{
      "category": "Grup motopropulsor",
      "oem_code": "N57D30A",
      "manufacturing_year": "2014",
      "warranty": "60 zile",
      "compatible_with": ["BMW Seria 5 F10/F11 530d/535d", "BMW Seria 7 F01 730d", "BMW X5 E70 30d", "BMW X6 E71 30d"],
      "notes": "Motor pornit și testat. Km verificabili prin raport Carvertical. Livrare cu toate accesoriile montate."
    }'::jsonb
  ),
  (
    'bmw-003',
    'Volan M-Sport cu padele',
    'F30',
    950,
    'Volan M-Sport original cu padele schimbător de viteze și butoane multifuncționale. Alcantara și piele fină. Potrivit pentru F30, F31, F34.',
    'https://placehold.co/800x500/111827/e2b96f?text=Volan+M-Sport+F30',
    'Excelentă',
    45000,
    '{
      "category": "Interior",
      "oem_code": "32307845723",
      "color": "Negru / Alcantara",
      "manufacturing_year": "2018",
      "warranty": "30 zile",
      "compatible_with": ["BMW Seria 3 F30 / F31 / F34 (2012-2019)", "BMW Seria 4 F32 / F33 / F36", "BMW Seria 2 F22 / F23"],
      "notes": "Airbag-ul NU este inclus. Volant verificat electric – toate butoanele funcționează. Fără uzură vizibilă pe alcantara."
    }'::jsonb
  ),
  (
    'bmw-004',
    'Cutie Automată ZF 8HP',
    'G01',
    4200,
    'Cutie de viteze automată ZF 8HP50 extrasă din BMW X3 G01 xDrive30d. Funcționează perfect, fără erori. Pregătită pentru instalare imediată.',
    'https://placehold.co/800x500/111827/e2b96f?text=Cutie+ZF+8HP50',
    'Bună',
    89000,
    '{
      "category": "Transmisie",
      "oem_code": "ZF 8HP50",
      "manufacturing_year": "2020",
      "warranty": "45 zile",
      "compatible_with": ["BMW X3 G01 xDrive30d", "BMW X4 G02 xDrive30d", "BMW Seria 5 G30 530d xDrive", "BMW Seria 7 G11 730d"],
      "notes": "Cutie extrasă de 3 zile. Livrare cu convertizor de cuplu și modul TCU. Se poate programa la orice service BMW."
    }'::jsonb
  ),
  (
    'bmw-005',
    'Hayon cu sticlă panoramică',
    'F11',
    1200,
    'Hayon complet BMW Seria 5 F11 Touring în culoarea Alpinweiß (A96). Fără lovituri sau rugină. Include motoare electrice, broască și cablaj.',
    'https://placehold.co/800x500/111827/e2b96f?text=Hayon+F11+Touring',
    'Bună',
    134000,
    '{
      "category": "Caroserie",
      "oem_code": "41007248591",
      "color": "Alpinweiß III – A96",
      "manufacturing_year": "2016",
      "warranty": "30 zile",
      "compatible_with": ["BMW Seria 5 F11 Touring (2010-2017)"],
      "notes": "Include geamul de hayon, motorul electric de geam, dispozitivul de închidere soft-close și tot cablajul. Necesită vopsire dacă culoarea mașinii diferă."
    }'::jsonb
  )
ON CONFLICT (id) DO NOTHING;
