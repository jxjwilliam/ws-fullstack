import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// loading.io
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '80vh',
  },
  style1: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  style2: {
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: theme.spacing(0),
    right: theme.spacing(0),
    margin: 'auto',
  },
}))

export default function ({ style = 1 }) {
  const classes = useStyles()
  const className = style === 1 ? classes.style1 : classes.style2
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" className={className} />
    </div>
  )
}
