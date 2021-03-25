import React from 'react'
import { Link, Typography } from '@material-ui/core'
import { version } from '../../../package.json'

export default function ({ opt = 'subtitle1' }) {
  return (
    <Typography component="span" variant={opt} color="textPrimary" align="center">
      版权所有 Copyright ©
      <Link color="inherit" href="http://www.bestitconsulting.com/">
        Best IT Consulting Ltd.
      </Link>
      {` 当前版本 ${version}，${new Date().getFullYear()}年。`}
    </Typography>
  )
}
