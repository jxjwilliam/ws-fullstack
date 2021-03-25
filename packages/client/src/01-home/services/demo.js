import React from 'react'
import { Box } from '@material-ui/core'
import { Emoji, ProTip } from '../../components'

export default function () {
  return (
    <Box my={4}>
      <ProTip />
      <Emoji symbol="💪🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝" />
    </Box>
  )
}
