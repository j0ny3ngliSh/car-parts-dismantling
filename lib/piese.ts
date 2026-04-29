export type Piesa = {
  id: string;
  nume: string;
  model_bmw: string;
  pret: number;
  descriere: string;
  imagine_placeholder: string;
  stare: "Excelentă" | "Foarte bună" | "Bună";
  km: number;
  detalii: {
    categorie: string;
    cod_oem?: string;
    culoare?: string;
    an_fabricatie?: string;
    garantie: string;
    compatibil_cu: string[];
    extras?: string;
  };
};

export const piese: Piesa[] = [
  {
    id: "bmw-001",
    nume: "Far LED Adaptiv",
    model_bmw: "G30",
    pret: 1850,
    stare: "Foarte bună",
    km: 62000,
    descriere:
      "Far stânga LED adaptiv original BMW Seria 5 G30 (2017-2023). Stare excelentă, fără fisuri sau defecte. Include cablaj și modul de control.",
    imagine_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Far+LED+Adaptiv+G30",
    detalii: {
      categorie: "Iluminat",
      cod_oem: "63117214939",
      an_fabricatie: "2019",
      garantie: "30 zile",
      compatibil_cu: ["BMW Seria 5 G30 2017-2020", "BMW Seria 5 G31 Touring"],
      extras: "Include modul de control AHL și cablajul original. Testat înainte de livrare.",
    },
  },
  {
    id: "bmw-002",
    nume: "Motor Diesel N57",
    model_bmw: "F10",
    pret: 8500,
    stare: "Bună",
    km: 112000,
    descriere:
      "Motor complet N57D30A 3.0d 258CP extras din BMW Seria 5 F10 xDrive. 112.000 km reali, verificabili. Include toate anexele. Garanție 60 zile.",
    imagine_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Motor+N57D30A",
    detalii: {
      categorie: "Grup motopropulsor",
      cod_oem: "N57D30A",
      an_fabricatie: "2014",
      garantie: "60 zile",
      compatibil_cu: [
        "BMW Seria 5 F10/F11 530d/535d",
        "BMW Seria 7 F01 730d",
        "BMW X5 E70 30d",
        "BMW X6 E71 30d",
      ],
      extras:
        "Motor pornit și testat. Km verificabili prin raport Carvertical. Livrare cu toate accesoriile montate.",
    },
  },
  {
    id: "bmw-003",
    nume: "Volan M-Sport cu padele",
    model_bmw: "F30",
    pret: 950,
    stare: "Excelentă",
    km: 45000,
    descriere:
      "Volan M-Sport original cu padele schimbător de viteze și butoane multifuncționale. Alcantara și piele fină. Potrivit pentru F30, F31, F34.",
    imagine_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Volan+M-Sport+F30",
    detalii: {
      categorie: "Interior",
      cod_oem: "32307845723",
      culoare: "Negru / Alcantara",
      an_fabricatie: "2018",
      garantie: "30 zile",
      compatibil_cu: [
        "BMW Seria 3 F30 / F31 / F34 (2012-2019)",
        "BMW Seria 4 F32 / F33 / F36",
        "BMW Seria 2 F22 / F23",
      ],
      extras:
        "Airbag-ul NU este inclus. Volant verificat electric – toate butoanele funcționează. Fără uzură vizibilă pe alcantara.",
    },
  },
  {
    id: "bmw-004",
    nume: "Cutie Automată ZF 8HP",
    model_bmw: "G01",
    pret: 4200,
    stare: "Bună",
    km: 89000,
    descriere:
      "Cutie de viteze automată ZF 8HP50 extrasă din BMW X3 G01 xDrive30d. Funcționează perfect, fără erori. Pregătită pentru instalare imediată.",
    imagine_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Cutie+ZF+8HP50",
    detalii: {
      categorie: "Transmisie",
      cod_oem: "ZF 8HP50",
      an_fabricatie: "2020",
      garantie: "45 zile",
      compatibil_cu: [
        "BMW X3 G01 xDrive30d",
        "BMW X4 G02 xDrive30d",
        "BMW Seria 5 G30 530d xDrive",
        "BMW Seria 7 G11 730d",
      ],
      extras:
        "Cutie extrasă de 3 zile. Livrare cu convertizor de cuplu și modul TCU. Se poate programa la orice service BMW.",
    },
  },
  {
    id: "bmw-005",
    nume: "Hayon cu sticlă panoramică",
    model_bmw: "F11",
    pret: 1200,
    stare: "Bună",
    km: 134000,
    descriere:
      "Hayon complet BMW Seria 5 F11 Touring în culoarea Alpinweiß (A96). Fără lovituri sau rugină. Include motoare electrice, broască și cablaj.",
    imagine_placeholder:
      "https://placehold.co/800x500/111827/e2b96f?text=Hayon+F11+Touring",
    detalii: {
      categorie: "Caroserie",
      cod_oem: "41007248591",
      culoare: "Alpinweiß III – A96",
      an_fabricatie: "2016",
      garantie: "30 zile",
      compatibil_cu: ["BMW Seria 5 F11 Touring (2010-2017)"],
      extras:
        "Include geamul de hayon, motorul electric de geam, dispozitivul de închidere soft-close și tot cablajul. Necesită vopsire dacă culoarea mașinii diferă.",
    },
  },
];

export function getPiesaById(id: string): Piesa | undefined {
  return piese.find((p) => p.id === id);
}
