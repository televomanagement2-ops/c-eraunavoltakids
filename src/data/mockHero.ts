import type { HeroSlide } from '../types'
import { u } from './mockProducts'

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-hero-1',
    tag: 'In primo piano',
    title: 'Cogli il momento',
    subtitle:
      'Scopri lo stile per tutte le età — completini delicati fino ai look da parco più vivaci.',
    accent: 'accent-a',
    images: [
      u('photo-1503454537195-1dcabb73ffb9'),
      u('photo-1515488042361-ee00e0ddd4e4'),
      u('photo-1522771739844-6a9f6d5f14af'),
      u('photo-1519238263530-99bdd11df2ea'),
    ],
    collageAlts: [
      'Bambina con adulto nella natura',
      'Bambino che osserva',
      'Bambini in movimento nel parco',
      'Famiglia durante attività all\'aria aperta',
    ],
  },
  {
    id: 'slide-hero-2',
    tag: 'Dal nido alla classe',
    title: 'Morbidi, pratici e colorati',
    subtitle:
      'Strati semplici da togliere e capi resistenti al gioco perché anche le mamme prendono sempre meno tempo.',
    accent: 'accent-b',
    images: [
      u('photo-1544367567-0f2fcb009e0b'),
      u('photo-1609220136736-443140cffec6'),
      u('photo-1588850561407-ed78c282e89b'),
      u('photo-1576566588028-4147f3842f27'),
    ],
    collageAlts: [
      'Yoga divertente tra bambini',
      'Bambino sorride al sole',
      'Gruppo di bambini in attività',
      'Piccolo in abbigliamento casual',
    ],
  },
  {
    id: 'slide-hero-3',
    tag: 'Storie italiane',
    title: 'Un mondo anche dietro casa',
    subtitle:
      'Materiali delicati sulla pelle, colori ispirati ai paesaggi e alle mattine serene al mercato locale.',
    accent: 'accent-c',
    images: [
      u('photo-1609220136736-443140cffec6'),
      u('photo-1576566588028-4147f3842f27'),
      u('photo-1588850561407-ed78c282e89b'),
      u('photo-1503454537195-1dcabb73ffb9'),
    ],
    collageAlts: [
      'Mamma felice che gioca coi piccoli',
      'Abbigliamento ordinato sugli appendiabiti',
      'Bambina con camicia a righe',
      'Famiglia passeggia in centro',
    ],
  },
]
