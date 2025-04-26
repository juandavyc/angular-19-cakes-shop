export const CONFIG = {
  APP_NAME: 'Pastelería JB x',
  API_BASE_URL: 'http://localhost:8081/api',
  SUPPORT_EMAIL: 'soporte@pasteleriajb.com',

  TOOLTIPS: [
    '¡Lo encontraste!',
    '¡Se ve delicioso!',
    '¡Este es perfecto para ti!',
    '¡Si, Sii este es!'
  ],
  STATS: {
    cakes: 600,
    years: '5 Años',
    rating: 4.8
  },
  SOCIAL: {
    title: {
      facebook: 'Pastelería JB',
      instagram: 'Pastelería J.B',
      tiktok: 'johanna.bonilla3',
      whatsapp: '311 238 8851',
    },
    url: {
      facebook: 'https://www.facebook.com/profile.php?id=100065153166630',
      instagram: 'https://www.instagram.com/pasteleriajb2024/',
      tiktok: 'https://www.tiktok.com/@johanna.bonilla3',
      whatsapp: 'https://api.whatsapp.com/send/?phone=573112388851&text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tu%20pasteler%C3%ADa',
    }
  },
  CREDITS: {
    name: 'juandavyc',
    url: 'http://juandavyc.netlify.app'
  },
  SHOP: {
    DEFAULTS: {
      form: {
        occasion: 'todas-las-ocasiones',
        category: 'todas-las-categorias',
        title: '',
        minPrice: '',
        maxPrice: '',
        sort: 'created',
        size: '9',
      },
      url: {
        occasion: 'todas-las-ocasiones',
        category: 'todas-las-categorias',
        title: '',
        "min-price": '',
        "max-price": '',
        sort: 'created',
        size: '9',
        page: '0'
      }

    },

    SORT: [
      'created',
      'min_price',
      'max_price'
    ],
    LIMIT: [
      1,
      9,
      12,
      15
    ],
  }
};
