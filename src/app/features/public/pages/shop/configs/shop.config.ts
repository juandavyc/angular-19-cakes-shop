export const SHOP_CONFIG = {
  title: 'Tienda',
  subtitle: '"La felicidad tiene sabor a pastel recién horneado"',
  defaults: {
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
  ]
}
