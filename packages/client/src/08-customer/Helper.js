import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import {
  LocationCity as LocationCityIcon,
  LiveHelp as LiveHelpIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons'

const PARENT_PATH = '帮助'

const HelperInfo = [
  {
    path: '帮助中心',
    icon: LiveHelpIcon,
  },
  {
    path: '注册指导',
    icon: ExitToAppIcon,
  },
  {
    path: '公司简介',
    icon: LocationCityIcon,
  },
]

export const HelpMenu = () => {
  const list = HelperInfo.map(item => {
    const CompIcon = item.icon
    return (
      <ListItem button component={Link} to={`${PARENT_PATH}/${item.path}`} key={item.path}>
        <ListItemIcon>
          <CompIcon />
        </ListItemIcon>
        <ListItemText primary={item.path} />
      </ListItem>
    )
  })

  return <div>{list}</div>
}

export const HelpContent = () => (
  <Switch>
    {HelperInfo.map(item => (
      <Route path={`${PARENT_PATH}/${item.path}`} render={() => <h2>{item.path}</h2>} key={item.path} />
    ))}
  </Switch>
)
