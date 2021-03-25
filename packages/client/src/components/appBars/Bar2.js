import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  FormControl,
  InputLabel,
  Link,
} from '@material-ui/core'
import { AccountCircle, Home as HomeIcon } from '@material-ui/icons'
import { Signin } from '../../02-auth'
import { checkLogin, getToken, pageReload } from '../../config/utils'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: 300,
  },
  field: {
    width: 260,
  },
  fields: {
    marginLeft: theme.spacing(2),
  },
  right: {
    textAlign: 'right',
  },
  top: {
    marginTop: theme.spacing(2),
  },
}))

export default function (props) {
  const {
    children,
    auth: { token },
  } = props
  const account = getToken().username || 'TODO-getToken.account'

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpen1 = () => {
    setOpen1(true)
  }

  const handleClose1 = () => {
    setOpen1(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen2 = () => setOpen2(true)

  const handleClose2 = () => setOpen1(false)

  const handleOk = () => {
    // TODO: logout flow.
    handleClose()
    pageReload()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpen2}>切换账户</MenuItem>
        <MenuItem onClick={handleOpen1}>我的账户</MenuItem>
        <MenuItem onClick={handleOpen}>退出</MenuItem>
        {account && <MenuItem>账号：{account}</MenuItem>}
      </Menu>
      <Dialog open={open2} onClose={handleClose2}>
        <Signin />
      </Dialog>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle id="form-dialog-title">创建用户表单</DialogTitle>
        <DialogContent>
          <DialogContentText>添加，修改用户账号</DialogContentText>
        </DialogContent>
        <form className={classes.form}>
          <TextField autoFocus id="account" label="账号" fullWidth margin="dense" className={classes.field} />
          <br />
          <TextField id="name" label="姓名" margin="normal" className={classes.field} />
          <br />
          <FormControl className={classes.field}>
            <InputLabel htmlFor="role">角色</InputLabel>
            <Select>
              <MenuItem value="">
                <em>请选择</em>
              </MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField multiline rows={4} id="description" label="描述" margin="normal" className={classes.field} />
        </form>
        <DialogActions>
          <Button onClick={handleClose1} color="secondary">
            取消
          </Button>
          <Button onClick={handleClose1} color="primary">
            创建
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">退出登录确认</h2>
            <p id="transition-modal-description">确定退出吗？</p>
            <Button onClick={handleClose} color="primary">
              否
            </Button>
            <Button onClick={handleOk} color="primary">
              是
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  )

  return (
    checkLogin(token) || (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/" color="inherit" variant="h6">
              <HomeIcon />
            </Link>
            {children}
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    )
  )
}
