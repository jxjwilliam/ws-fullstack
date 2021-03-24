import React, { useState, useEffect } from 'react'
import { HEADERS, TOKEN } from './constants.json'
import { Loading, NotFound, Error } from '../common'
import { pageReload } from './utils'

/**
 * 1. local 加token，有content-type和accept
 * 2. 上传文件，加token，但没有content-type
 *  in case encType="multipart/form-data", remove "Content-Type": "application/json; charset=UTF-8",
 * 3. 代理第三方服务不加，但有content-type和accept
 * 4. 选项 isFileOrProxy: 1 文件; 2 proxy; undefined 普通fetch，等于fetchingOrig+token
 * 5. backdoor: isFileOrProxy > 2 ?
 */
function fetching(url, opts = {}, isFileOrProxy) {
  let [headers, body, method] = [{}, null, 'GET']

  // 代理第三方服务，比如Java App，不需要验证
  if (isFileOrProxy >= 2) headers = { ...HEADERS, ...opts.headers }
  else {
    const authToken = sessionStorage.getItem(TOKEN)
    if (!authToken) {
      console.error('权限认证失败，请先注册')
      return pageReload()
    }

    // 文件上传(isFileOrProxy===1), 不要content-type
    headers = isFileOrProxy === 1 ? { Accept: HEADERS.Accept } : HEADERS
    headers = { ...headers, ...opts.headers, authorization: `Bearer ${authToken}` }
  }

  if (opts.method) method = opts.method
  // need JSON.stringify (POST) ?
  if (opts.body) body = opts.body

  return fetch(url, { method, headers, body })
    .then(res => {
      if (res.ok) return res.json()

      /**
       * process 4xx:
       *  res.status is number, so X: res.status.startsWith(4)
       *  access-token expired, 401, 403, statusText="Unauthorized"
       */
      if (/^4\d{2}/.test(res.status)) {
        return pageReload()
      }
      throw new Error(res.statusText)
    })
    .catch(e => console.error('操作失败: ', e.message))
}

// useCallback, useFetchData
const actionFetcher = (url, opts = {}) => () => fetching(url, opts)

// ref: https://medium.com/front-end-weekly/data-fetcher-component-using-hooks-and-render-props-aacf3162dfc2
function useFetcher(action) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function loadData() {
    try {
      setLoading(true)
      const result = await action()
      setData(result.json())
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return [data, loading, error]
}

export default ({ action: args, children }) => {
  let fetchOrAction
  // mostly case is 'string'
  if (typeof args === 'string') fetchOrAction = actionFetcher(args)
  else if (typeof args === 'function') fetchOrAction = args
  else if (typeof args === 'object' && args !== null) {
    const { url, opts } = args
    fetchOrAction = actionFetcher(url, opts)
  }

  const [data, loading, error] = useFetcher(fetchOrAction)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  return children(data)
}
