import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Link, Typography } from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import faker from 'faker'
import { defer } from '@ws-fullstack/lib'
import { checkLogin } from '../config/utils'
import { Title } from '../common'

export default function (props) {
  const [data, setData] = useState([])

  useEffect(() => {
    defer(setData([faker.lorem.sentence(), faker.lorem.sentence()]))
  }, [])

  // checkLogin(props.auth) ||
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <HomeIcon />
          <Title />
        </Toolbar>
      </AppBar>
      <main>
        <Typography>{JSON.stringify(data, null, 2)}</Typography>
      </main>
    </div>
  )
}
