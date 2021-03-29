import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Link as MuiLink } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// william added
import { Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { HOME_PAGE, REGISTER_PAGE } from '../config/constants.json'
import { fetching, setToken } from '../config'
import { Loading, NotFound, Error } from '../containers'
import useAuth from '../useHooks/use-auth'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

  const submitFunction = async (url, options) => {
    const json = await fetching(url, options)
    return json
  }

  const onCompleted = token => {
    if (token) setToken(token)
  }

  const [login, { loading, error, data }] = useAuth(submitFunction, false, { onCompleted })

  const onSubmit = async formData => {
    await login('/api/v1/login', {
      method: 'post',
      body: JSON.stringify(formData),
    })
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data?.notfound) return <NotFound />
  if (data) return <Redirect to={HOME_PAGE} />

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            />
            {errors.password && <p>{errors.password.message}</p>}

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
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
                </MuiLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
