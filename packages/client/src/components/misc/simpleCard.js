import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'inline-flex',
      direction: 'row',
      width: '40%',
    },
    card: {
      padding: theme.spacing(2),
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
)

// https://codesandbox.io/s/sckvn?file=/src/App.js:680-684
const SimpleCard = ({ data = {} }) => {
  const classes = useStyles()
  const loading = Object.keys(data).length === 0

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circle" width={40} height={40} />
            ) : (
              <Avatar aria-label="recipe" className={classes.avatar}>
                R{' '}
              </Avatar>
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            ) : (
              'Shrimp and Chorizo Paella'
            )
          }
          subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : 'March 20, 2020'}
        />
        <CardContent>
          {loading ? (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {data}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {loading ? null : (
            <>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

export default React.memo(SimpleCard)
