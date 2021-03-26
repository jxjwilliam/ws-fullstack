import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Container, CssBaseline, Toolbar, Link as MuiLink, Button, ButtonGroup } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Home as HomeIcon } from '@material-ui/icons'
import faker from 'faker'
import { defer } from '@ws-fullstack/lib'
import { checkLogin } from '../config/utils'
import Title from '../components/appBars/title'
import { Emoji, ProTip, SimpleCard } from '../components'
import theme from '../themes'
import { menuList } from '../config/navs'
import { navList as navs1 } from '../03-services/router'
import { navList as navs2 } from '../04-playground/router'
import { navList as navs3 } from '../05-graphql/router'
import { navList as navs4 } from '../06-mui/router'
import { navList as navs5 } from '../07-docs/router'
import { Menu2 } from '../components/menus'

const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
})

const getMap = () => {
  const Routers = [navs1, navs2, navs3, navs4, navs5]
  return menuList.reduce((map, br, idx) => {
    if (!Routers[idx]) return map
    const { component, ...others } = br
    map.set(others, Routers[idx])
    return map
  }, new Map())
}

const patch = routers => {
  const certificate = menuList[menuList.length - 1]
  const { path, title, icon: Icon } = certificate
  return routers.push(
    <ButtonGroup key={title} ariant="contained" aria-label="outlined primary button group">
      <Button color="inherit" startIcon={<Icon />} component={Link} href={path}>
        {title}
      </Button>
    </ButtonGroup>,
  )
}

function getNavList() {
  const all5 = getMap()
  const routers = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of all5) {
    const { path, title, icon: CompIcon } = key
    routers.push(
      <ButtonGroup key={title}>
        <Menu2 routers={value} base={path} title={title} Icon={CompIcon} />
      </ButtonGroup>,
    )
  }
  patch(routers)

  return routers
}
export default function (props) {
  const classes = useStyles()
  const routers = getNavList()
  const [data, setData] = useState([])

  useEffect(() => {
    defer(setData([faker.lorem.sentence(), faker.lorem.sentence()]))
  }, [])

  return (
    checkLogin(props.auth) || (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <MuiLink component={Link} to="/" color="inherit" variant="h6">
                <HomeIcon />
              </MuiLink>{' '}
              <Title />
              {routers}
            </Toolbar>
          </AppBar>
          <Box my={4}>
            <ProTip />
            <Emoji symbol="💪🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝" />
          </Box>
          <SimpleCard data={data[0]} />
          <SimpleCard data={data[1]} />
        </Container>
      </ThemeProvider>
    )
  )
}
