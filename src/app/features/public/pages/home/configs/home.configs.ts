import { HOME_ASSETS } from "./home.assets";

export const HOME_CONFIGS = {
  stats: {
    cakes: 600,
    years: '5 Años',
    rating: 4.8
  },
  recommended: {
    title: 'Recomendados',
    subtitle: 'Nuestros clientes aman estos sabores',
    cakes: [
      {
        name: 'Chocolate',
        isNew: false,
        description: 'Ponque con decorado de crema Richs',
        image: HOME_ASSETS.recommended[0],
        url: 'chocolate'
      },
      {
        name: 'Vainilla Rosa',
        isNew: true,
        description: 'Ponque negro con crema Richs',
        image: HOME_ASSETS.recommended[1],
        url: 'vainilla-rosa'
      },
      {
        name: 'Fresa Salvaje',
        isNew: false,
        description: 'Ponque con frutos rojos',
        image: HOME_ASSETS.recommended[2],
        url: 'fresa-salvaje'
      },
      {
        name: 'Red Velvet',
        isNew: true,
        description: 'Ponque relleno de frutos amarillos',
        image: HOME_ASSETS.recommended[3],
        url: 'red-velvet'
      }
    ]
  },
  categories: {
    title: 'Celebra con nosotros',
    subtitle: 'Hacemos tus momentos inolvidables',
    occasions: [
      {
        name: 'Cumpleaños',
        image: HOME_ASSETS.occasions[0],
        url: 'cumpleanos'
      },
      {
        name: 'Matrimonios',
        image: HOME_ASSETS.occasions[1],
        url: 'matrimonios'
      },
      {
        name: 'Regalos',
        image: HOME_ASSETS.occasions[2],
        url: 'regalos'
      },
      {
        name: 'Baby shower',
        image: HOME_ASSETS.occasions[3],
        url: 'baby-shower'
      },
      {
        name: 'Graduaciones',
        image: HOME_ASSETS.occasions[4],
        url: 'graduaciones'
      },
      {
        name: 'Personalizados',
        image: HOME_ASSETS.occasions[5],
        url: 'personalizados'
      },
      {
        name: 'Todos',
        image: HOME_ASSETS.occasions[6],
        url: 'todas-las-ocasiones'
      },
    ]
  },
  perfect: {
    title: '¡El pastel perfecto en 4 pasos!',
  }

}
