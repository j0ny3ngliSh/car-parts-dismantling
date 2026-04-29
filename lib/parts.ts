import { supabaseAdmin } from "@/lib/supabaseClient";

export type Piesa = {
  id: string;
  name: string;
  bmw_model: string;
  price: number;
  description: string;
  image_placeholder: string;
  condition: "Excelentă" | "Foarte bună" | "Bună";
  km: number;
  details: {
    category: string;
    oem_code?: string;
    color?: string;
    manufacturing_year?: string;
    warranty: string;
    compatible_with: string[];
    notes?: string;
  };
};

export const samplePiese: Piesa[] = [
  {
    id: "bmw-001",
    name: "Far LED Adaptiv",
    bmw_model: "G30",
    price: 1850,
    condition: "Foarte bună",
    km: 62000,
    description:
      "Far stânga LED adaptiv original BMW Seria 5 G30 (2017-2023). Stare excelentă, fără fisuri sau defecte. Include cablaj și modul de control.",
    image_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Far+LED+Adaptiv+G30",
    details: {
      category: "Iluminat",
      oem_code: "63117214939",
      manufacturing_year: "2019",
      warranty: "30 zile",
      compatible_with: ["BMW Seria 5 G30 2017-2020", "BMW Seria 5 G31 Touring"],
      notes: "Include modul de control AHL și cablajul original. Testat înainte de livrare.",
    },
  },
  {
    id: "bmw-002",
    name: "Motor Diesel N57",
    bmw_model: "F10",
    price: 8500,
    condition: "Bună",
    km: 112000,
    description:
      "Motor complet N57D30A 3.0d 258CP extras din BMW Seria 5 F10 xDrive. 112.000 km reali, verificabili. Include toate anexele. Garanție 60 zile.",
    image_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Motor+N57D30A",
    details: {
      category: "Grup motopropulsor",
      oem_code: "N57D30A",
      manufacturing_year: "2014",
      warranty: "60 zile",
      compatible_with: [
        "BMW Seria 5 F10/F11 530d/535d",
        "BMW Seria 7 F01 730d",
        "BMW X5 E70 30d",
        "BMW X6 E71 30d",
      ],
      notes:
        "Motor pornit și testat. Km verificabili prin raport Carvertical. Livrare cu toate accesoriile montate.",
    },
  },
  {
    id: "bmw-003",
    name: "Volan M-Sport cu padele",
    bmw_model: "F30",
    price: 950,
    condition: "Excelentă",
    km: 45000,
    description:
      "Volan M-Sport original cu padele schimbător de viteze și butoane multifuncționale. Alcantara și piele fină. Potrivit pentru F30, F31, F34.",
    image_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Volan+M-Sport+F30",
    details: {
      category: "Interior",
      oem_code: "32307845723",
      color: "Negru / Alcantara",
      manufacturing_year: "2018",
      warranty: "30 zile",
      compatible_with: [
        "BMW Seria 3 F30 / F31 / F34 (2012-2019)",
        "BMW Seria 4 F32 / F33 / F36",
        "BMW Seria 2 F22 / F23",
      ],
      notes:
        "Airbag-ul NU este inclus. Volant verificat electric – toate butoanele funcționează. Fără uzură vizibilă pe alcantara.",
    },
  },
  {
    id: "bmw-004",
    name: "Cutie Automată ZF 8HP",
    bmw_model: "G01",
    price: 4200,
    condition: "Bună",
    km: 89000,
    description:
      "Cutie de viteze automată ZF 8HP50 extrasă din BMW X3 G01 xDrive30d. Funcționează perfect, fără erori. Pregătită pentru instalare imediată.",
    image_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Cutie+ZF+8HP50",
    details: {
      category: "Transmisie",
      oem_code: "ZF 8HP50",
      manufacturing_year: "2020",
      warranty: "45 zile",
      compatible_with: [
        "BMW X3 G01 xDrive30d",
        "BMW X4 G02 xDrive30d",
        "BMW Seria 5 G30 530d xDrive",
        "BMW Seria 7 G11 730d",
      ],
      notes:
        "Cutie extrasă de 3 zile. Livrare cu convertizor de cuplu și modul TCU. Se poate programa la orice service BMW.",
    },
  },
  {
    id: "bmw-005",
    name: "Hayon cu sticlă panoramică",
    bmw_model: "F11",
    price: 1200,
    condition: "Bună",
    km: 134000,
    description:
      "Hayon complet BMW Seria 5 F11 Touring în culoarea Alpinweiß (A96). Fără lovituri sau rugină. Include motoare electrice, broască și cablaj.",
    image_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Hayon+F11+Touring",
    details: {
      category: "Caroserie",
      oem_code: "41007248591",
      color: "Alpinweiß III – A96",
      manufacturing_year: "2016",
      warranty: "30 zile",
      compatible_with: ["BMW Seria 5 F11 Touring (2010-2017)"],
      notes:
        "Include geamul de hayon, motorul electric de geam, dispozitivul de închidere soft-close și tot cablajul. Necesită vopsire dacă culoarea mașinii diferă.",
    },
  },
];

export async function fetchPiese(): Promise<Piesa[]> {
  const { data, error } = await supabaseAdmin
    .from("parts")
    .select("*");

  if (error) {
    console.warn("Supabase fetchPiese failed:", error.message);
    return samplePiese;
  }

  return (data as Piesa[]) ?? samplePiese;
}

export async function getPiesaById(id: string): Promise<Piesa | undefined> {
  const { data, error } = await supabaseAdmin
    .from("parts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.warn(`Supabase getPiesaById(${id}) failed:`, error.message);
    return samplePiese.find((p) => p.id === id);
  }

  return data ?? samplePiese.find((p) => p.id === id);
}
