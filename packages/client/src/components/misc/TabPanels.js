import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Typography, Box, Paper } from '@material-ui/core'

function Panel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`available-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={6}>{children}</Box>
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ({ ary = [] }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabs = (tab, handleTab) => {
    const tablist = ary.map((item, idx) => <Tab label={item} {...a11yProps({ idx })} key={item} />)
    return (
      <Paper className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleTab}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable tabs"
        >
          {tablist}
        </Tabs>
      </Paper>
    )
  }

  const panels = item =>
    ary.map((tab, idx) => (
      <Panel value={item} index={idx} key={tab}>
        {tab}
      </Panel>
    ))

  return (
    <>
      {tabs(value, handleChange)}
      {panels(value)}
    </>
  )
}
