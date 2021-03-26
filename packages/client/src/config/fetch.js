import { useState, useEffect } from 'react'
import { HEADERS, TOKEN } from './constants.json'

/**
 * 1. local 加token，有content-type和accept
 * 2. 上传文件，加token，但没有content-type
 *  in case encType="multipart/form-data", remove "Content-Type": "application/json; charset=UTF-8",
 * 3. 代理第三方服务不加，但有content-type和accept
 * 4. 选项 needAuth: true:false
 */
export function fetching(url, opts = {}) {
  const { needAuth = true, isUpload = false, method = 'GET', body } = opts
  let headers = {}

  if (!needAuth) headers = { ...opts.headers, ...HEADERS }
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

// ref: https://medium.com/front-end-weekly/data-fetcher-component-using-hooks-and-render-props-aacf3162dfc2
export function useFetching(url, options) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    setLoading(true)

    async function loadData() {
      try {
        const json = await fetching(url, options)
        console.log('---json---: ', json)
        setData(json)
        setError(null)
      } catch (err) {
        setError(err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [url, options])

  return { data, loading, error }
}
