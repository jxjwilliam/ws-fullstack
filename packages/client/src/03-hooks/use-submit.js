import React, { useState } from 'react'

const useSubmit = submitFunction => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * use-async == use-auth == use-submit
   * https://codesandbox.io/embed/dry-surf-08wz9?fontsize=14
   */
  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)
      await submitFunction()
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  return [handleSubmit, loading, error]
}

export default function () {
  const mySubmitFunction = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const rnd = Math.random() * 10
        // eslint-disable-next-line no-unused-expressions
        rnd <= 5 ? resolve() : reject(new Error('Error state!'))
      }, 1000)
    })
  const [handleSubmit, loading, error] = useSubmit(mySubmitFunction)

  return (
    <div>
      <button type="button" onClick={handleSubmit} disabled={loading}>
        {!loading ? 'Click me' : 'Loading...'}
      </button>
      {error && <div>{error}</div>}
    </div>
  )
}
