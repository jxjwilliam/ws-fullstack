import React, { useState } from 'react'
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

/**
 * react-hook-form
 */
const useStyles = makeStyles(() => ({
  form: {
    width: 300,
  },
  field: {
    width: 260,
    marginLeft: 20,
  },
}))

export default function () {
  const classes = useStyles()
  const [form, setForm] = useState({})

  const handleChange = ({ target: { id, value } }) => {
    setForm({
      form: {
        ...form,
        [id]: value,
      },
    })
  }

  // TODO:
  const { name, account, role, roles, description } = form
  return (
    <form className={classes.form}>
      <TextField
        autoFocus
        id="account"
        label="账号"
        value={account}
        onChange={handleChange}
        fullWidth
        margin="dense"
        className={classes.field}
      />
      <br />
      <TextField
        id="name"
        label="姓名"
        value={name}
        onChange={handleChange}
        margin="normal"
        className={classes.field}
      />
      <br />
      <FormControl className={classes.field}>
        <InputLabel htmlFor="role">角色</InputLabel>
        <Select
          value={role}
          onChange={handleChange}
          inputProps={{
            name: 'role',
            id: 'role',
          }}
        >
          <MenuItem value="">
            <em>请选择</em>
          </MenuItem>
          {roles.map(r => (
            <MenuItem value={r} key={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        multiline
        rows={4}
        id="description"
        label="描述"
        value={description}
        onChange={handleChange}
        margin="normal"
        className={classes.field}
      />
    </form>
  )
}
