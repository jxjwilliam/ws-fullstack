import { useState, useEffect, useCallback } from 'react'

export default function (asyncFunction, immediate = true, opts) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(
    (url, option) => {
      setLoading(true)
      asyncFunction(url, option)
        .then(json => {
          setData(json)
          setError(null)
          if (json?.token && opts?.onCompleted) {
            opts.onCompleted(json.token)
          }
        })
        .catch(err => {
          setError(err)
          setData(null)
        })
        .then(() => setLoading(false))
    },
    [asyncFunction, opts],
  )

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return [execute, { data, loading, error }]
}
