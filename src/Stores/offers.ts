import { defineStore } from 'pinia';

export const useOffersStore = defineStore('offers', {
  state: () => ({
    offers: [
      {
        title: 'Entrada gratis en tu cumpleaños',
        description:
          'Regístrate y recibe una entrada gratis en el mes de tu cumpleaños si traes a 3 amigos contigo.',
          getImageSrc: () => import('@/images/cumpleanos.png'), // Cambiado a import
        altText: 'Cumpleaños',
        isNew: true,
        tags: ['Cumpleaños', 'Amigos']
      },
      {
        title: 'Estreno Joker con amigos',
        description:
          'Únete al estreno del Joker este 11 de noviembre y trae a un amigo para obtener 50% de descuento.',
        imageSrc: () => import('@/images/ofertajoker.png'), // Cambiado a import
        altText: 'Joker',
        isNew: false,
        tags: ['Estreno', 'Descuento']
      },
      {
        title: 'Llavero de Película',
        description: 'Asiste al estreno y llévate un llavero exclusivo. ¡Hasta agotar existencias!',
        imageSrc: () => import('@/images/Oferta-Llavero.png'), // Cambiado a import
        altText: 'Llavero',
        isNew: false,
        tags: ['Estreno', 'Regalo']
      },
      {
        title: 'Póster de Estreno',
        description: 'Recibe un póster oficial el primer día del estreno.',
        imageSrc: () => import('@/images/Oferta-Poster.png'), // Cambiado a import
        altText: 'Póster',
        isNew: true,
        tags: ['Póster', 'Exclusivo']
      }
    ]
  })
});
