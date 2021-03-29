import React, { useState } from 'react'
import MaterialTable from 'material-table'
// TODO: @material-ui/core/Table
import Transitions from './dialog'

// id, url, company_url, description, how_to_apply, company_logo
// created_at.split(' ').slice(0, 3).join(' ')
function Jobs({ jobs, title }) {
  const columns = [
    { title: 'title', field: 'title' },
    { title: 'type', field: 'type' },
    { title: 'company', field: 'company' },
    { title: 'location', field: 'location' },
    { title: 'created_at', field: 'created_at' },
  ]

  const [open, setOpen] = React.useState(false)
  const [job, setJob] = useState({})

  const handleClickOpen = rowData => {
    setOpen(true)
    setJob(rowData)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Transitions job={job} open={open} handleClose={handleClose} />
      <MaterialTable
        columns={columns}
        data={jobs}
        title={title}
        actions={[
          {
            icon: 'save',
            tooltip: `details`,
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
        options={{
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default Jobs
