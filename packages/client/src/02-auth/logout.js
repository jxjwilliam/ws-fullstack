import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { LOGIN_PAGE } from '../config/constants.json'
import { removeToken } from '../config/utils'

export default function () {
  useEffect(() => {
    removeToken()
  }, [])

  return <Redirect to={LOGIN_PAGE} />
}
