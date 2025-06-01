export const SHOP_CONFIG = {
  title: 'Tienda',
  subtitle: '"La felicidad tiene sabor a pastel recién horneado"',
  defaults: {
    form: {
      occasion: 'todas-las-ocasiones',
      category: 'todas-las-categorias',
      name: '',
      minPrice: '',
      maxPrice: '',
      sort: 'created',
      size: '9',
    },
    url: {
      occasion: 'todas-las-ocasiones',
      category: 'todas-las-categorias',
      name: '',
      "min-price": '',
      "max-price": '',
      sort: 'created',
      size: '9',
      page: '0',
    },
  },
  sort: [
    'created',
    'min_price',
    'max_price'
  ],
  size: [
    9,
    12,
    15
  ],
  seo: {
    title: 'Tienda | Pastelería JB - Endulzando tus mejores momentos',
    description: 'Descubre nuestra variedad de productos para toda ocasión. Desde aniversarios hasta baby showers, en Pastelería JB tenemos el pastel perfecto para ti. Envíos desde Cubarral, Meta.',
    tags: 'tienda de pasteles, comprar pasteles, pastelería en Cubarral, tortas para eventos, pasteles personalizados, Pastelería JB',
  }
}
