import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { Menu1, Emoji, ProTip } from '../components'
import { navList } from '../config/routers'
import { Title, Description } from '../config/constants.json'

export default function () {
  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Menu1 routers={navList} title="Menu" />
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
  )
}
