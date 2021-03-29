import React from 'react'
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
import { Container, List, ListItem, ListItemIcon, ListItemText, Typography, Link as MuiLink } from '@material-ui/core'
import { isEmpty } from '@ws-fullstack/lib'
import bars from '../appBars'
import NavList from './Nav1'
import Layout1 from './Layout1'

// TODO: React.Children: only/toArray, props.children
// path, component/render
function FTemplate(props) {
  const {
    match: { path, url },
    location: { pathname },
  } = props
  const breadcrumbs = path.substr(1).split('/').join(' 👉🏻 ')
  return (
    <h6>
      [{`${breadcrumbs} : `}], [{url}], [{pathname}]
    </h6>
  )
}

function getRouters(url, currentNav, mainList) {
  const subAry = mainList.find(item => item.nav === currentNav).main
  const basePath = `${url}/${currentNav}`
  return [basePath, subAry]
}

const renderNav = (base, navList) => (
  <bars.Bar2>
    <Typography>
      <MuiLink component={Link} to={`/${base}`} color="inherit" variant="h6">
        {base}
      </MuiLink>
    </Typography>
    <NavList base={base} navs={navList} />
  </bars.Bar2>
)

const renderMenu = (basePath, items = []) => {
  const list = (items || []).map(({ path, title, icon: CompIcon }) => (
    <ListItem
      button
      component={NavLink}
      exact
      to={`${basePath}/${path}`}
      activeStyle={{ backgroundColor: '#f5f5f5' }}
      key={path}
    >
      <ListItemIcon>
        <CompIcon />
      </ListItemIcon>
      <ListItemText primary={title || path} />
    </ListItem>
  ))
  return <List>{list}</List>
}

const renderContent = (basePath, items = [], redirect = {}) => (
  <Switch>
    {!isEmpty(redirect) ? <Redirect exact from={redirect.from} to={redirect.to} /> : null};
    {items.map(({ path, component }) => {
      const url = `${basePath}/${path}`
      if (component) return <Route path={url} component={component} key={path} />
      return <Route path={url} render={FTemplate} key={path} />
    })}
  </Switch>
)

/**
 * location.pathname represents the root-relative url: "/风险管理/系统管理/角色查询"
 * match.url represents the matched portion of the URL,so maybe a portion of location.pathname: "/风险管理"
 * /风险管理, /风险管理/系统管理, /风险管理/系统管理/角色查询
 */
const getPageLayout = (navList, mainList, options) => {
  const { pathname, url } = options
  const base = url.substr(1)
  const list = renderNav(base, navList)

  const ary = pathname.substr(1).split('/')
  const aryLen = ary.length
  let [url2, url3] = ['', '']
  const redirect = {}

  switch (aryLen) {
    case 1:
      redirect.from = pathname
      url2 = navList[0].path
      url3 = mainList.find(item => item.nav === url2).main[0].path
      redirect.to = `${pathname}/${url2}/${url3}`
      break
    case 2:
      redirect.from = pathname
      // eslint-disable-next-line prefer-destructuring
      url2 = ary[1]
      url3 = mainList.find(item => item.nav === url2).main[0].path
      redirect.to = `${pathname}/${url3}`
      break
    case 3:
      ;[, url2, url3] = ary // fetch ary[1,2]
      break
    default:
      throw new Error('TODO: ')
  }

  console.log('%c Layout', 'background: #222; color: #bada55', redirect, url2, url3)

  const [basePath, subAry] = getRouters(url, url2, mainList)

  const list2 = renderMenu(basePath, subAry)
  const list3 = renderContent(basePath, subAry, redirect)
  const Layout = Layout1(list2, list3)

  return (
    <Container fixed>
      {list}
      <Layout {...options} />
    </Container>
  )
}

export default getPageLayout
