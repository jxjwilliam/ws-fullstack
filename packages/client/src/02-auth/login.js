import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link as MuiLink } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// william added
import { Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { defer } from '@ws-fullstack/lib'
import { HOME_PAGE, REGISTER_PAGE } from '../config/constants.json'
import { fetching } from '../config/fetch'
import { setToken } from '../config/utils'
import { Loading, NotFound, Error } from '../containers'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function () {
  const classes = useStyles()
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const onSubmit = async formData => {
    setLoading(true)
    try {
      const ret = await fetching('/api/v1/login', {
        method: 'post',
        needAuth: false,
        body: JSON.stringify(formData),
      })
      if (ret?.token) {
        setToken(ret.token)
        setData(ret.token)
      } else {
        setData({ notfound: true })
        console.error('something wrong', ret)
      }
    } catch (err) {
      setError(err)
      setData(null)
    } finally {
      defer(setLoading(false))
    }
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data?.notfound) return <NotFound />
  if (data) return <Redirect to={HOME_PAGE} />

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            ref={register({ required: 'this is a required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            ref={register({ required: 'this is a required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink component={Link} to="#" variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink component={Link} to={REGISTER_PAGE} variant="body2">
                Don't have an account? Sign Up
                <span role="img" aria-label="hat">
                  🤠
                </span>
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
