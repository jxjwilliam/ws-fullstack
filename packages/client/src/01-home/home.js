import React from 'react'
import { Container, CssBaseline } from '@material-ui/core'
import { bars } from '../components'
import HomeDemo from './demo'
import { checkLogin } from '../config/utils'

export default function (props) {
  return (
    checkLogin(props.auth) || (
      <>
        <CssBaseline />
        <Container fixed>
          <bars.Bar1 />
          {props.children}
          <HomeDemo />
        </Container>
      </>
    )
  )
}
