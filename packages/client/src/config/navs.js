import React from 'react'
import { Link } from 'react-router-dom'
import {
  // OfflineBolt,  VerifiedUser,
  Business,
  BusinessCenter,
  AttachMoney,
  SettingsApplications,
  SupervisorAccount,
  Store,
  Home as AppHome,
  LockOpen,
  AccountBox,
} from '@material-ui/icons'

export const menuList = [
  {
    title: 'Home',
    path: '/',
    icon: AppHome,
  },
  {
    title: 'Info',
    path: '/info',
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
    title: 'Logout',
    path: '/logout',
    icon: LockOpen,
  },
]

export default function () {
  return menuList.map(({ title, path, icon: NavIcon }) => (
    <Link to={path} key={title}>
      <NavIcon />
      {title}
    </Link>
  ))
}
