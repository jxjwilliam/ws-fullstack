import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, CssBaseline, Toolbar, Link as MuiLink } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Home as HomeIcon } from '@material-ui/icons'
import faker from 'faker'
import { defer } from '@ws-fullstack/lib'
import { checkLogin } from '../config/utils'
import Title from '../components/appBars/title'
import getNavList from './navList'
import theme from './services/theme'
import ServiceDemo from './services/demo'
import SimpleCard from './services/simpleCard'

const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
})

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
          <ServiceDemo />
          <SimpleCard data={data[0]} />
          <SimpleCard data={data[1]} />
        </Container>
      </ThemeProvider>
    )
  )
}
