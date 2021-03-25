import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, Fade, Link, Button } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

// 09-service/index: menus
const useStyles = makeStyles(theme => ({
  link: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.5),
      textDecoration: 'none',
    },
  },
  button: {
    margin: theme.spacing(2),
  },
  icon: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
}))

export default function ({ routers = [], base, title, Icon = MenuIcon }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  function handleOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const renderMenu = (
    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
      {routers.map(({ icon: CompIcon = MenuIcon, path }) => (
        <Link href={`${base}/${path}`} key={path} className={classes.link}>
          <MenuItem onClick={handleClose} className={classes.icon}>
            {CompIcon ? <CompIcon fontSize="small" /> : null}
            {path}
          </MenuItem>
        </Link>
      ))}
    </Menu>
  )

  return (
    <>
      <Button color="inherit" className={classes.button} startIcon={<Icon />} onClick={handleOpen}>
        {title}
      </Button>
      {renderMenu}
    </>
  )
}
