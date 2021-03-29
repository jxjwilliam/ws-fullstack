import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import GrainIcon from '@material-ui/icons/Grain'

// TODO: integrate with <Title/>
const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}))

export default function ({ path }) {
  const classes = useStyles()
  const [n1, n2, n3] = path.split('/').filter(s => !!s)

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href={`/${n1}`} className={classes.link}>
        <HomeIcon className={classes.icon} />
        {n1}
      </Link>
      <Link color="inherit" href={`/${n1}/${n2}`} className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        {n2}
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        {n3}
      </Typography>
    </Breadcrumbs>
  )
}
