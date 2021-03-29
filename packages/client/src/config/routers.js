import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Info } from '../01-home'
import { C404, About, Contact } from '../containers'
import { Login, Signin, Register, Logout } from '../02-auth'
import Hooks from '../03-hooks'
import Playground from '../04-playground'
import GraphQL from '../05-graphql'
import Mui from '../06-mui'
import Docs from '../07-docs'
import Customer from '../08-customer'
import { HOME_PAGE, LOGIN_PAGE, SIDE_LOGIN_PAGE, REGISTER_PAGE, LOGOUT_PAGE } from './constants.json'

export default function () {
  const routers = [
    {
      path: HOME_PAGE,
      exact: true,
      component: Home,
    },
    {
      path: '/客户信息',
      component: Customer,
    },
    {
      path: '/info',
      component: Info,
    },
    {
      path: '/hooks',
      component: Hooks,
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
      path: '/about',
      component: About,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: LOGIN_PAGE,
      component: Login,
    },
    {
      path: SIDE_LOGIN_PAGE,
      component: Signin,
    },
    {
      path: REGISTER_PAGE,
      component: Register,
    },
    {
      path: LOGOUT_PAGE,
      component: Logout,
    },
    {
      path: '*',
      component: C404,
    },
  ].map(({ path, component, ...rest }) => <Route path={path} component={component} key={path} {...rest} />)

  return <Switch>{routers}</Switch>
}
