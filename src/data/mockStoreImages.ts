import { u } from './mockProducts'

/** Immagini vetrina mock per la pagina negozio (slug Unsplash noti stabili sul progetto). */
export const storeBannerSlugs: string[] = [
  'photo-1503454537195-1dcabb73ffb9',
  'photo-1544367567-0f2fcb009e0b',
  'photo-1515488042361-ee00e0ddd4e4',
  'photo-1609220136736-443140cffec6',
  'photo-1519238263530-99bdd11df2ea',
]

export const storeBannerUrls: string[] = storeBannerSlugs.map((slug) => u(slug))

export const storeBannerAlts: string[] = [
  'Ingresso luminoso della boutique',
  'Scaffali con capi per bambini',
  'Interno boutique con tonalità naturali',
  'Dettaglio packaging e tessuti',
  'Angolo cambio neonati nel negozio',
]
