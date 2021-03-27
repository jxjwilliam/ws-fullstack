import { Description } from '@material-ui/icons'

const navList = [
  {
    path: 'test',
    icon: Description,
  },
]
const mainList = [
  {
    nav: 'test',
    main: [
      {
        path: '角色查询',
        title: 'Weather',
        icon: Description,
        component: <h2>Playground</h2>,
      },
    ],
  },
]

export { navList, mainList }
