import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

export default function DialogSlide({ job, open, handleClose }) {
  const {
    id,
    type,
    url,
    created_at,
    company,
    company_url,
    location,
    title,
    description,
    how_to_apply,
    company_logo,
  } = job
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img className="detail" src={company_logo} width="100" height="60" alt="detail" />
          {title} - {company}
          {type} - {location}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" dangerouslySetInnerHTML={{ __html: description }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <a href={url} target="_blank" rel="noreferrer">
            Apply
          </a>
        </DialogActions>
      </Dialog>
    </div>
  )
}
