/* eslint-disable no-restricted-syntax */
import React from 'react'
import { Button, ButtonGroup, Link } from '@material-ui/core'
import { navList } from '../config/routers'
import { navList as navs1 } from '../03-services/router'
import { navList as navs2 } from '../04-playground/router'
import { navList as navs3 } from '../05-graphql/router'
import { navList as navs4 } from '../06-mui/router'
import { navList as navs5 } from '../07-docs/router'
import { Menu2 } from '../components/menus'

const getMap = () => {
  const Routers = [navs1, navs2, navs3, navs4, navs5]
  return navList.reduce((map, br, idx) => {
    if (!Routers[idx]) return map
    const { component, ...others } = br
    map.set(others, Routers[idx])
    return map
  }, new Map())
}

const patch = routers => {
  const certificate = navList[navList.length - 1]
  const { path, title, icon: Icon } = certificate
  return routers.push(
    <ButtonGroup key={title} ariant="contained" aria-label="outlined primary button group">
      <Button color="inherit" startIcon={<Icon />} component={Link} href={path}>
        {title}
      </Button>
    </ButtonGroup>,
  )
}

export default function () {
  const all5 = getMap()
  const routers = []
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
