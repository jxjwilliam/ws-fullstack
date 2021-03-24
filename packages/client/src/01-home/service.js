import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import faker from 'faker'
import { defer } from '@ws-fullstack/lib'
import { checkLogin } from '../config/utils'
import { Title } from '../components'

export default function (props) {
  const [data, setData] = useState([])

  useEffect(() => {
    defer(setData([faker.lorem.sentence(), faker.lorem.sentence()]))
  }, [])

  return (
    checkLogin(props.auth) || (
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
  )
}
