import React, { useState, useEffect } from 'react'
import Loading from './loading'
import NotFound from './notFound'
import Error from './error'

function useFetcher(action) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadData = async function () {
      try {
        setLoading(true)
        const actionData = await action()
        if (isMounted) setData(actionData)
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [action])

  return [data, loading, error]
}

// useCallback, useFetchData
const actionFetcher = (url, opts = {}) => () => fetch(url, opts).then(ret => ret.json())

/**
 * action types:
 * string: https://api.github.com/users/jxjwilliam
 * object: (url, options)
 * promise: fetchingGithub(search)
 */
export default ({ action, children }) => {
  let fetchOrAction
  if (typeof action === 'string') fetchOrAction = actionFetcher(action)
  else if (typeof action === 'function') fetchOrAction = action
  else if (typeof action === 'object' && action !== null) {
    if (typeof action.then === 'function') {
      fetchOrAction = action.then
    } else {
      const { url, opts } = action
      fetchOrAction = actionFetcher(url, opts)
    }
  } else {
    throw new Error('action error:', action)
  }

  const [data, loading, error] = useFetcher(fetchOrAction)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  return children(data)
}
