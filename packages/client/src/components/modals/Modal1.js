import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import { pageReload } from '../../config/utils'

const useStyles = makeStyles(theme => ({
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
}))

export default function () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOk = () => {
    // TODO: logout flow.
    handleClose()
    pageReload()
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        确认提示框
      </button>
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
    </div>
  )
}
