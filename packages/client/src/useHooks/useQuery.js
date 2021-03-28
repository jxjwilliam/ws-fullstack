import React, { useState } from 'react'

/**
 * https://www.apollographql.com/docs/react/data/queries/
 * in: query, opts
 * out: {loading, error, data, refetch, fetchMore}
 */
const useQuery = (query, opts) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  return { data, loading, error }
}

export default useQuery

/**
 * <button onClick={() => lazyClick({})} />
 */
export const useLazyQuery = (query, opts) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const lazyClick = () => true

  return [lazyClick, { loading, data, error }]
}
