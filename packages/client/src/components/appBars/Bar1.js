import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AppBar, Toolbar, Button, Link } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { Home as HomeIcon, Business as BusinessIcon } from '@material-ui/icons'
import Gitbook from './Gitbook'
import Search from './Search'
import Notification from './Notification'
import Profile from './Profile'
import FormDialog from '../dialogs/Dialog1'
import { LOGIN_PAGE } from '../../config/constants.json'
import * as menus from '../menus'
import { navList } from '../../config/routers'

const Group1 = () => (
  <>
    <Link href="/" color="inherit" variant="h6">
      <HomeIcon />
    </Link>
    <menus.Menu1 routers={navList} Icon={BusinessIcon} title="Business" />
    <Gitbook />
  </>
)

const Group2 = () => (
  <>
    <Search />
    <Notification />
    <Profile />
  </>
)

const Group3 = ({ handleLogin }) => (
  <>
    <Tooltip title="register">
      <Button color="inherit" onClick={handleLogin}>
        注册
      </Button>
    </Tooltip>
    <FormDialog />
  </>
)

export default function ({ children }) {
  const [to, setTo] = useState()
  const handleLogin = () => {
    setTo(LOGIN_PAGE)
  }

  // eslint-disable-next-line
  return to ? <Redirect to={to} /> : (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Group1 />
          {children}
          <Group2 />
          <Group3 handleLogin={handleLogin} />
        </Toolbar>
      </AppBar>
    </div>
  )
}
