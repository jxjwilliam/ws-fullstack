import React from 'react'
import { checkLogin } from '../config/utils'

export default function (props) {
  return checkLogin(props.auth) || <h1>Hello the world</h1>
}
