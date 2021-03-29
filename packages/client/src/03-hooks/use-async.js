import React, { useState, useEffect, useCallback } from 'react'

// An async function for testing our hook.
// Will be successful 50% of the time.
const myFunction = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10
      if (rnd <= 5) resolve('Submitted successfully 🙌')
      else reject(new Error('Oh there was an error 😞'))
    }, 2000)
  })

// Hook
const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return asyncFunction()
      .then(response => {
        setValue(response)
        setStatus('success')
      })
      .catch(err => {
        console.log('ERROR: ', err, JSON.stringify(err))
        setError(err)
        setStatus('error')
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}

// Usage
export default function () {
  const { execute, status, value, error } = useAsync(myFunction, false)

  return (
    <div>
      {status === 'idle' && <div>Start your journey by clicking a button</div>}
      {status === 'success' && <div>{value}</div>}
      {status === 'error' && <div>{JSON.stringify(error)}</div>}
      <button type="button" onClick={execute} disabled={status === 'pending'}>
        {status !== 'pending' ? 'Click me' : 'Loading...'}
      </button>
    </div>
  )
}
