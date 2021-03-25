import React from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import Box from '@material-ui/core/Box'

export default function () {
  return (
    <NoSsr>
      <Box
        color="primary.main"
        bgcolor="background.paper"
        fontFamily="h6.fontFamily"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
      >
        Sorry, Can't find the page.
      </Box>
    </NoSsr>
  )
}
