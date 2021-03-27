import { useState, useEffect } from 'react'
import { HEADERS, TOKEN } from './constants.json'

/**
 * login, access-ms, file-upload, 3rd-proxy
 */
const Options = {
  localAuth: {
    needAuth: false,
    isProxy: false,
    isUpload: false,
  },
  localApi: {
    needAuth: true,
    isProxy: false,
    isUpload: false,
  },
  localUpload: {
    needAuth: true,
    isProxy: false,
    isUpload: true,
  },
  proxy: {
    needAuth: false,
    isProxy: true,
    isUpload: false,
  },
}

/**
 * 1. local 加token，有content-type和accept
 * 2. 上传文件，加token，但没有content-type
 * 3. 代理第三方服务不加，但有content-type和accept
 * 4. 选项 isProxy: true/false
 */
export function fetching(url, opts = {}) {
  const { needAuth = false, isProxy = false, isUpload = false, method = 'GET', body } = opts
  let headers = {}

  if (!needAuth || isProxy) headers = { ...opts.headers, ...HEADERS }
  else {
    const authToken = sessionStorage.getItem(TOKEN)
    if (!authToken) {
      sessionStorage.removeItem(TOKEN)
      throw new Error('权限认证失败，请先注册')
    }

    headers = isUpload ? { Accept: HEADERS.Accept } : HEADERS
    headers = { ...headers, ...opts.headers, authorization: `Bearer ${authToken}` }
  }

  return fetch(url, { method, headers, body })
    .then(res => {
      if (res.ok) return res.json()
      throw new Error(res.statusText)
    })
    .catch(e => console.error('操作失败: ', e.message))
}

// https://medium.com/front-end-weekly/data-fetcher-component-using-hooks-and-render-props-aacf3162dfc2
export function useFetching(url, options) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      try {
        setLoading(true)
        const json = await fetching(url, options)
        if (isMounted) {
          setData(json)
          setError(null)
        }
      } catch (err) {
        setError(err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    loadData()

    return () => {
      isMounted = false
    }
  }, [url, options])

  return { data, loading, error }
}
