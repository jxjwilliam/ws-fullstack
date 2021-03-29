import { Description } from '@material-ui/icons'
import Github from './github'

const navList = {
  base: 'Playground',
  navs: [
    {
      path: 'github',
      icon: Description,
    },
  ],
}

const mainList = [
  {
    nav: 'github',
    main: [
      {
        path: 'github',
        title: 'Github',
        icon: Description,
        component: Github,
      },
    ],
  },
]

export { navList, mainList }
