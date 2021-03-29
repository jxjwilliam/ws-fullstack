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
    margin: '2rem auto',
  },
  box: {
    alignItems: 'flex-end',
  },
})

export default function ({ services = [] }) {
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

  const year = new Date().getFullYear()
  return (
    <footer className={classes.root}>
      <BottomNavigation value={value} onChange={handleChange}>
        {info}
      </BottomNavigation>
      <Box className={classes.box}>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright ©
          <Link color="inherit" href={Site} alt={Description}>
            {Title}
          </Link>
          {`, Current version ${version}, in ${parseInt(year, 10)} - ${year}. `}
        </Typography>
      </Box>
    </footer>
  )
}
