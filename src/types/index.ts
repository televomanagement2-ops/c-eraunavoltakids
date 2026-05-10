export type ProductSize =
  | '2 anni'
  | '4 anni'
  | '6 anni'
  | '8 anni'
  | '10 anni'
  | '12 anni'
  | '14 anni'
  | 'unica'

export type ProductColor =
  | 'Sage'
  | 'Polvere'
  | 'Cielo'
  | 'Senape'
  | 'Crema'
  | 'Corallo'
  | 'Menta'
  | 'Naturale'

export type ProductCategory =
  | 'Neonati 0-2'
  | 'Bambini 3-8'
  | 'Ragazzi 9-14'
  | 'Accessori'
  | 'Saldi'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  sizes: ProductSize[]
  colors: ProductColor[]
  images: string[]
  isNew: boolean
  isSoldOut: boolean
  stock: number
  rating: number
}

export type HeroSlide = {
  id: string
  title: string
  subtitle: string
  tag: string
  accent: string
  /** Singola immagine (fallback). */
  image?: string
  /** Collage 3–4 foto (banner). */
  images?: string[]
  /** Alt per ogni cella collage (facoltativo). */
  collageAlts?: string[]
}

export type FinanceEntry = {
  id: string
  date: string
  label: string
  amount: number
}
