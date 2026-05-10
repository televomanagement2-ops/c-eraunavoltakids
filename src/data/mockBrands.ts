export type BrandProfile = {
  id: string
  name: string
  tagline?: string
  description: string
  highlights: string[]
}

export const brands: BrandProfile[] = [
  {
    id: 'luna-petit',
    name: 'Luna Petit',
    tagline: 'Ninnananna e giornata',
    description:
      'Linea pensata dai primissimi giorni di vita fino alla scuola dell’infanzia, con tessuti certificati per pelli sensibili.',
    highlights: [
      'Cotone biologico certificato GOTS nei body e tutine',
      'Colori tratteggiati a freddo, senza sostanze irritanti note',
      'Packaging compostabile nei capi Neonati',
    ],
  },
  {
    id: 'nido-naturale',
    name: 'Nido Naturale',
    tagline: 'Calore domestico',
    description:
      'Brand italiano ispirato al mondo domestico gentile e ai mercati delle piccole citta.',
    highlights: [
      'Tonalità terrose e fantasie ispirate alla fauna locale',
      'Tagli comodi anche per stratificazioni in autunno',
      'Partnership annuale con un laboratorio tessile familiare',
    ],
  },
  {
    id: 'acquerello-kids',
    name: 'Acquerello Kids',
    tagline: 'Tinte morbide e gioco libero',
    description:
      'Stampe che richiamano l’effetto pigmenti delicati senza rinunciare alla resistenza al lavaggio frequente.',
    highlights: [
      'Abbinamenti tonalità pastel + grafiche limitate stagionali',
      'Rinforzi alle ginocchia e nei punti soggetti a abrasione',
      'Lookbook co-creato con genitori e educatori',
    ],
  },
  {
    id: 'stella-mattina',
    name: 'Stella Mattina',
    tagline: 'Wake up leggero',
    description:
      'Colazione in terrazza anche solo in sogno — capi leggerezza per la fascia 3–8 anni e accessori luminosi.',
    highlights: [
      'Maglia traspirante e shorts morbidi per attività all’aria aperta',
      'Cappellini e scaldacollo coordinati nei kit weekend',
      'Programma cambio taglia semplificato in negozio',
    ],
  },
  {
    id: 'riva-di-mare',
    name: 'Riva di Mare',
    tagline: 'Aria salina, fibre morbide',
    description:
      'Linee estive ispirate alla costa ligure e alle passeggiate in riva dopo la merenda.',
    highlights: [
      'Tessuti con trattamenti anti-sale leggeri sugli accompagnatori mare',
      'Collaborazioni con illustrator locali sulle grafiche estive',
    ],
  },
]

export const marqueeBrandNames: string[] = brands.map((b) => b.name)
