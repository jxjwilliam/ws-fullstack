import { Description } from '@material-ui/icons'
import Async from './use-async'
import Submit from './use-submit'
import Toggle from './use-toggle'

const navList = {
  base: 'Hooks',
  navs: [
    {
      path: 'Examples',
      icon: Description,
    },
  ],
}

const mainList = [
  {
    nav: 'Examples',
    main: [
      {
        path: 'toggle',
        title: 'use-toggle',
        icon: Description,
        component: Toggle,
      },
      {
        path: 'async',
        title: 'use async',
        icon: Description,
        component: Async,
      },
      {
        path: 'submit',
        title: 'use-submit',
        icon: Description,
        component: Submit,
      },
    ],
  },
]

export { navList, mainList }
