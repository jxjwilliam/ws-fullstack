import React from 'react'
import { Container, CssBaseline, Box, Card, CardContent, Typography } from '@material-ui/core'
import { Menu1, Emoji, ProTip, bars } from '../components'
import { menuList } from '../config/navs'
import { Title, Description } from '../config/constants.json'
import { checkLogin } from '../config/utils'

export default function (props) {
  return (
    checkLogin(props.auth) || (
      <>
        <CssBaseline />
        <Container fixed>
          <bars.Bar1 />
          {props.children}
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              <Menu1 routers={menuList} title="Menu" />
            </Typography>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {Description}
                </Typography>
              </CardContent>
            </Card>
            <ProTip />
            <Emoji symbol="💪🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝" />
          </Box>
        </Container>
      </>
    )
  )
}
