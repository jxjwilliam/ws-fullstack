import { HomeWork as AppHome, BusinessCenter, VerifiedUser } from '@material-ui/icons'
import { Route } from 'react-router-dom'
import { Link } from '@material-ui/core'
import { Home, Service } from '../01-home'
import { Login } from '../02-auth'
import { NotFound } from '../containers'

export const Navs = () =>
  [
    {
      title: 'Home',
      path: '/',
      icon: AppHome,
    },
    {
      title: 'Service',
      path: '/service',
      icon: BusinessCenter,
    },
    {
      title: 'Sign In',
      path: '/signin',
      icon: VerifiedUser,
    },
  ].map(({ title, path, icon: Icon }) => (
    <Link to={path} key={title}>
      <Icon />
      {title}
    </Link>
  ))

export const RouteList = () =>
  [
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
      component: NotFound,
    },
  ].map(({ path, component, ...rest }) => <Route path={path} component={component} key={path} {...rest} />)
