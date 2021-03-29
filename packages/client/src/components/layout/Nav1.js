import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

/**
 * TODO: Link -> NavLink
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    displayDirection: 'row',
    flexFlow: 'row wrap',
  },
  list: {
    width: 'auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  item: {
    paddingLeft: theme.spacing(1),
  },
  active: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
}))

// TODO: base=match.url
const NavList = ({ base, navs }) => {
  const classes = useStyles()
  /**
   * <NavLink>
   * activeClassName, activeStyle,
   * exact: when true, the active class/style will only be applied if the location is matched exactly.
   * isActive: func
   * location: object
   */
  const list = navs.map(({ path, title = path, icon: CompIcon }) => (
    <ListItem
      button
      className={classes.list}
      component={NavLink}
      // exact
      to={`/${base}/${path}`}
      activeClassName={classes.active}
      key={path}
    >
      {/* <ListItemIcon> */}
      <CompIcon fontSize="small" />
      {/* </ListItemIcon> */}
      <ListItemText className={classes.item} primary={title} />
    </ListItem>
  ))
  return (
    <>
      <List component="nav" className={classes.root}>
        {list}
      </List>
    </>
  )
}

export default NavList
