import { Description } from '@material-ui/icons'

const navList = {
  base: 'Playground',
  navs: [
    {
      path: 'GraphQL',
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
