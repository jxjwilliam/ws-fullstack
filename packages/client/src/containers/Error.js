import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function ({ error }) {
  return (
    <>
      <h1>Error</h1>
      <Box>
        <Typography>{JSON.stringify(error, null, 2)}</Typography>
      </Box>
    </>
  )
}
