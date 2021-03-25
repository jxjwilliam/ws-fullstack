import React from 'react'
// import { HomeWork as AppHome, BusinessCenter, VerifiedUser } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { Switch, Route, Link } from 'react-router-dom'
import { Home, Service } from '../01-home'
import { Login } from '../02-auth'
import { C404 } from '../containers'

const iconAry = ['AppHome', 'BusinessCenter', 'VerifiedUser'].map(icon => (
  <IconButton key={icon}>
    <Icon>{icon}</Icon>
  </IconButton>
))

export const Navs = () =>
  [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Service',
      path: '/service',
    },
    {
      title: 'Sign In',
      path: '/signin',
    },
  ].map(({ title, path }, idx) => (
    <Link to={path} key={title}>
      {iconAry[idx]}
      {title}
    </Link>
  ))

export const RouteList = () => {
  const routers = [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/service',
      component: Service,
    },
    {
      path: '/signin',
      component: Login,
    },
    {
      path: '*',
      component: C404,
    },
  ].map(({ path, component, ...rest }) => <Route path={path} component={component} key={path} {...rest} />)

  return <Switch>{routers}</Switch>
}
