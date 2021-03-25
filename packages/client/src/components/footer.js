import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction, Box, Link, Typography } from '@material-ui/core'
import {
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon,
  Folder as FolderIcon,
} from '@material-ui/icons'
import { version } from '../../package.json'
import { Title, Site, Description } from '../config/constants.json'

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: 'auto',
  },
  emoji: {},
})

export default function ({ services = [], symbol, emoji }) {
  const classes = useStyles()
  const [value, setValue] = useState('recents')

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  const info = [
    ...services,
    {
      label: 'About Us',
      icon: RestoreIcon,
    },
    {
      label: 'Contact Us',
      icon: FavoriteIcon,
    },
    {
      label: 'Services',
      icon: LocationOnIcon,
    },
    {
      label: 'Resources',
      icon: FolderIcon,
    },
  ].map(({ label, icon: Icon }) => <BottomNavigationAction label={label} value={label} icon={<Icon />} key={label} />)

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        {info}
      </BottomNavigation>
      <span className={classes.emoji} role="img" aria-label={emoji} aria-hidden={emoji ? 'false' : 'true'}>
        {symbol}
      </span>
      <Box color="primary.main">
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright ©
          <Link color="inherit" href={Site} alt={Description}>
            {Title}
          </Link>
          {` Version ${version}, ${new Date().getFullYear()}. `}
        </Typography>
      </Box>
    </>
  )
}
