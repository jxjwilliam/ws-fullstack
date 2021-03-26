import React from 'react'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { TOKEN, LOGIN_PAGE } from './constants.json'

// 401, 403, no token etc...
function pageReload() {
  setTimeout(() => {
    sessionStorage.removeItem(TOKEN)
    window.location.href = LOGIN_PAGE
  }, 1000)
}

const getToken = () => {
  const authToken = sessionStorage.getItem(TOKEN)
  return authToken
  // return authToken ? jwt_decode(authToken) : {}
}

const removeToken = () => {
  if (getToken()) sessionStorage.removeItem(TOKEN)
}

const setToken = token => {
  sessionStorage.setItem(TOKEN, token)
}

const checkLogin = auth => {
  const authToken = auth?.token || sessionStorage.getItem(TOKEN)
  if (!authToken) return <Redirect to={LOGIN_PAGE} />
  return null
}

export { pageReload, getToken, removeToken, setToken, checkLogin }
