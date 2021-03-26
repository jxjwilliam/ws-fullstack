import React from 'react'
import { fetching, useFetching } from '../config/fetch'
import Loading from './loading'
import NotFound from './notFound'
import Error from './error'

// useCallback, useFetchData
const actionFetcher = (url, opts = {}) => () => fetching(url, opts)

export default ({ action: args, children }) => {
  let fetchOrAction
  // mostly case is 'string'
  if (typeof args === 'string') fetchOrAction = actionFetcher(args)
  else if (typeof args === 'function') fetchOrAction = args
  else if (typeof args === 'object' && args !== null) {
    const { url, opts } = args
    fetchOrAction = actionFetcher(url, opts)
  }

  const { data, loading, error } = useFetching(fetchOrAction)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  return children(data)
}
