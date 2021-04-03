import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import { MdError } from 'react-icons/md'
import { ImFileEmpty } from 'react-icons/im'

const props = { fill: 'red', size: '2rem' }

export function Loading() {
  return (
    <div className="loading">
      <VscLoading {...props} />
    </div>
  )
}

export function Error() {
  return (
    <div className="error">
      <MdError {...props} />
    </div>
  )
}

export function NoRecord() {
  return (
    <div className="empty">
      <h2>No Record</h2>
      <ImFileEmpty {...props} />
    </div>
  )
}
