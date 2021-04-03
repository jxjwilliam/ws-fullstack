import { useState, useEffect } from 'react'

export default (url, options = null) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!url) return { loading, error, data }
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetch(url, options)
      .then(res => res.json())
      .then(data1 => {
        if (isMounted) {
          setData(data1)
          setError(null)
        }
      })
      .catch(error1 => {
        if (isMounted) {
          setError(error1)
          setData(null)
        }
      })
      .finally(() => isMounted && setLoading(false))

    // eslint-disable-next-line no-return-assign
    return () => (isMounted = false)
  }, [url, options])

  return { loading, error, data }
}
