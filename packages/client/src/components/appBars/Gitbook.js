import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MenuBook, Storage, PostAdd, TextFields } from '@material-ui/icons'
import * as menus from '../menus'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
})

const routers = [
  {
    title: 'Gitbook',
    path: '/gitbook',
    icon: MenuBook,
  },
  {
    title: 'Discovery API',
    path: '/ms-discovery',
    icon: PostAdd,
  },
  {
    title: 'Auth API',
    path: '/ms-auth',
    icon: PostAdd,
  },
  {
    title: 'DBMS API',
    path: '/ms-dbms',
    icon: Storage,
  },
  {
    title: 'DOC/Mongo API',
    path: '/ms-doc',
    icon: PostAdd,
  },
  {
    title: 'GraphQL API',
    path: '/ms-graphql',
    icon: Storage,
  },
]

export default function () {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <menus.Menu1 routers={routers} Icon={TextFields} title="Gitbook" />
    </div>
  )
}
