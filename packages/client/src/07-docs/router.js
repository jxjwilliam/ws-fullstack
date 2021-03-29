import { Description } from '@material-ui/icons'

const navList = {
  base: 'Docs',
  navs: [
    {
      path: 'test',
      icon: Description,
    },
  ],
}

const mainList = [
  {
    nav: 'test',
    main: [
      {
        path: '角色查询',
        title: 'Weather',
        icon: Description,
        component: <h2>Hello Test</h2>,
      },
    ],
  },
]

export { navList, mainList }
