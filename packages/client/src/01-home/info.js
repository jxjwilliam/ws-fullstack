import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Container, CssBaseline, Toolbar, Link as MuiLink, Button, ButtonGroup } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Home as HomeIcon } from '@material-ui/icons'
import faker from 'faker'
import { defer } from '@ws-fullstack/lib'
import Title from '../components/appBars/title'
import { Emoji, ProTip, SimpleCard, Menu2 } from '../components'
import theme from '../themes'
import { menuList, checkLogin } from '../config'
import { navList as navs1 } from '../03-hooks/router'
import { navList as navs2 } from '../04-playground/router'
import { navList as navs3 } from '../05-graphql/router'
import { navList as navs4 } from '../06-mui/router'
import { navList as navs5 } from '../07-docs/router'
import { navList as navs6 } from '../08-customer/router'

const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
})

const patch = routers => {
  const { path, title, icon: Icon } = menuList[menuList.length - 1]
  return routers.push(
    <ButtonGroup key={title} ariant="contained" aria-label="outlined primary button group">
      <Button color="inherit" startIcon={<Icon />} component={Link} to={path}>
        {title}
      </Button>
    </ButtonGroup>,
  )
}

function getNavList() {
  const routers = [navs1, navs2, navs3, navs4, navs5, navs6]
  return menuList.map(({ title, path, icon: CompIcon }) => {
    const subNavs = routers.find(({ base }) => base === title)?.navs || []
    return (
      <ButtonGroup key={title}>
        <Menu2 routers={subNavs} base={path} title={title} Icon={CompIcon} />
      </ButtonGroup>
    )
  })
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
          <main style={{ alignItems: 'center', marginTop: '6rem' }}>
            <SimpleCard data={data[0]} />
            <SimpleCard data={data[1]} />
            <Box my={4}>
              <ProTip />
              <Emoji symbol="💪🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝" />
            </Box>
          </main>
        </Container>
      </ThemeProvider>
    )
  )
}
