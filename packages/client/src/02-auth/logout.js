import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { LOGIN_PAGE, TOKEN } from '../config/constants.json'

export default function (props) {
  useEffect(() => {
    props
      .logoutAction()
      .then(() => sessionStorage.removeItem(TOKEN))
      .catch(e => console.error(e))
  }, [])
  return <Redirect to={LOGIN_PAGE} />
}
