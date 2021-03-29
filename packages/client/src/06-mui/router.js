import { Description, Help } from '@material-ui/icons'
import Checkout from './checkout/checkout'
import Album from './album'
import Price from './price'
import StickyFooter from './sticky-footer'

const navList = {
  base: 'Mui',
  navs: [
    {
      path: 'Templates',
      icon: Description,
    },
    {
      path: 'Help',
      icon: Description,
    },
  ],
}

const mainList = [
  {
    nav: 'Templates',
    main: [
      {
        path: 'checkout',
        title: 'Checkout',
        icon: Description,
        component: Checkout,
      },
      {
        path: 'album',
        title: 'Album',
        icon: Description,
        component: Album,
      },
      {
        path: 'price',
        title: 'Checkout',
        icon: Description,
        component: Price,
      },
      {
        path: 'sticky-footer',
        title: 'StickyFooter',
        icon: Description,
        component: StickyFooter,
      },
    ],
  },
  {
    nav: 'Help',
    main: [
      {
        path: 'help',
        icon: Help,
      },
    ],
  },
]

export { navList, mainList }
