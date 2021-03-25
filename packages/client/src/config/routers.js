import React from 'react'
import {
  OfflineBolt,
  Business,
  BusinessCenter,
  AttachMoney,
  SettingsApplications,
  SupervisorAccount,
  Store,
  Home as AppHome,
  VerifiedUser,
  LockOpen,
  AccountBox,
  ExitToApp,
} from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { Switch, Route, Link } from 'react-router-dom'
import { Home, Service } from '../01-home'
import { Login } from '../02-auth'
import { C404, About, Contact, Profile } from '../containers'
import Services from '../03-services'
import Playground from '../04-playground'
import GraphQL from '../05-graphql'
import Mui from '../06-mui'
import Docs from '../07-docs'

const iconAry = ['AppHome', 'BusinessCenter', 'VerifiedUser'].map(icon => (
  <IconButton key={icon}>
    <Icon>{icon}</Icon>
  </IconButton>
))

export const navList = [
  {
    title: 'Home',
    path: '/',
    icon: AppHome,
  },
  {
    title: 'Service',
    path: '/service',
    icon: AccountBox,
  },
  {
    title: 'Services',
    path: '/services',
    icon: Business,
  },
  {
    title: 'Playground',
    path: 'playground',
    icon: BusinessCenter,
  },
  {
    title: 'GraphQL',
    path: '/graphql',
    icon: AttachMoney,
  },
  {
    title: 'Mui',
    path: '/mui',
    icon: SettingsApplications,
  },
  {
    title: 'Docs',
    path: '/docs',
    icon: SupervisorAccount,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: Store,
  },
]

export const Navs = () =>
  navList.map(({ title, path, icon: NavIcon }) => (
    <Link to={path} key={title}>
      <NavIcon />
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
      path: '/services',
      component: Services,
    },
    {
      path: '/playground',
      component: Playground,
    },
    {
      path: '/graphql',
      component: GraphQL,
    },
    {
      path: '/mui',
      component: Mui,
    },
    {
      path: '/docs',
      component: Docs,
    },
    {
      path: '/profile',
      component: Profile,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: '*',
      component: C404,
    },
  ].map(({ path, component, ...rest }) => <Route path={path} component={component} key={path} {...rest} />)

  return <Switch>{routers}</Switch>
}
