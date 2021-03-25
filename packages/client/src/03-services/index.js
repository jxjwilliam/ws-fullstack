import React from 'react'

const navList = [
  {
    path: '系统管理',
    icon: 'LaptopWindows',
  },
]

const mainList = [
  {
    path: 'role',
    title: 'Weather',
    icon: 'Person',
    component: <h1>Component</h1>,
  },
]

export { navList, mainList }

export default function () {
  return <h1>Services</h1>
}
