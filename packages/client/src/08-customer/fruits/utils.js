/* eslint-disable no-restricted-syntax */
import { useState, useEffect } from 'react'

export const useFetch = (url, options = null) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetch(url, options)
      .then(res => res.json())
      .then(obj => {
        if (isMounted) {
          // eslint-disable-next-line no-prototype-builtins
          if (typeof obj === 'object' && obj.hasOwnProperty('name')) setData([obj])
          else setData(obj)
          setError(null)
        }
      })
      .catch(error1 => {
        if (isMounted) {
          setError(error1)
          setData(null)
        } else if (error1.message) {
          setError(error1.message)
          setData(null)
        }
      })
      .finally(() => isMounted && setLoading(false))

    // eslint-disable-next-line no-return-assign
    return () => (isMounted = false)
  }, [url, options?.mode])

  return { loading, error, data }
}

export const getNutrition = nutrition => {
  let str = ''
  for (const [key, value] of Object.entries(nutrition)) {
    const name = key.charAt(0).toUpperCase() + key.slice(1)
    str += `${name}: ${value}, `
  }
  return str.replace(/,\s*$/, '')
}
