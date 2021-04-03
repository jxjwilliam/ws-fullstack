import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { Link as MuiLink } from '@material-ui/core'
import {
  OfflineBolt,
  VerifiedUser,
  Business,
  BusinessCenter,
  AttachMoney,
  SettingsApplications,
  SupervisorAccount,
  Store,
  Home as AppHome,
  LockOpen,
  AccountBox,
  Alarm,
  Subject,
} from '@material-ui/icons'

export const menuList = [
  {
    title: 'Home',
    path: '/',
    icon: AppHome,
  },
  {
    title: 'Customer',
    path: '/客户信息',
    icon: SupervisorAccount,
  },
  {
    title: 'Info',
    path: '/info',
    icon: AccountBox,
  },
  {
    title: 'Hooks',
    path: '/hooks',
    icon: Business,
  },
  {
    title: 'Playground',
    path: '/playground',
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
    icon: Subject,
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: LockOpen,
  },
]

export const GeneralList = () =>
  [
    {
      title: 'About',
      path: '/about',
      icon: OfflineBolt,
    },
    {
      title: 'Contact',
      path: '/contact',
      icon: Store,
    },
    {
      title: 'Info',
      path: '/info',
      icon: VerifiedUser,
    },
    {
      title: 'Login',
      path: '/login',
      icon: Alarm,
    },
  ].map(({ title, path, icon: MenuIcon }) => (
    <MuiLink component={Link} to={path} key={title} color="inherit" variant="subtitle1">
      <IconButton color="inherit" aria-label="title">
        <MenuIcon />
      </IconButton>
      {title}
    </MuiLink>
  ))

export default function MenuList() {
  return menuList.map(({ title, path, icon: NavIcon }) => (
    <Button component={Link} to={path} key={title} variant="contained" color="secondary" startIcon={<NavIcon />}>
      {title}
    </Button>
  ))
}
