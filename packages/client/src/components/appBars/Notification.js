import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}))

export default function () {
  const classes = useStyles()

  return (
    <>
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 6 new mails" color="inherit">
          <Tooltip title="emails">
            <Badge badgeContent={6} color="secondary">
              <MailIcon />
            </Badge>
          </Tooltip>
        </IconButton>
        <IconButton aria-label="show 18 new notifications" color="inherit">
          <Tooltip title="notification">
            <Badge badgeContent={18} color="secondary">
              <NotificationsIcon />
            </Badge>
          </Tooltip>
        </IconButton>
      </div>
    </>
  )
}
