import React, { Component } from 'react'
import './customer.css'
import getPageLayout from '../components/layout/logic'
import { navList, mainList } from './router'

export default class Customer extends Component {
  render() {
    const {
      location: { pathname },
      match: { url, path },
    } = this.props
    const options = {
      pathname,
      url,
      path,
    }
    const pageLayout = getPageLayout(navList.navs, mainList, options)
    return <>{pageLayout}</>
  }
}
