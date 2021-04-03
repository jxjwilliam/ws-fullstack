import React, { useState, useEffect, useCallback, useRef } from 'react'

const ButtonPair = React.memo(({ onIncrement, onDecrement }) => (
  <>
    <button type="button" onClick={onIncrement}>
      Increment
    </button>
    <button type="button" onClick={onDecrement}>
      Decrement
    </button>
  </>
))

function Counter() {
  const [counter, setCounter] = useState(0)
  const [value, setValue] = useState(0)
  const inputEl = useRef(null)

  const incrementCounter = useCallback(() => {
    setCounter(counter + 1)
    setValue(counter + 1)
  }, [counter])
  const decrementCounter = useCallback(() => {
    setCounter(counter - 1)
    setValue(counter - 1)
  }, [counter])

  const handleChange = evt => {
    // evt.target.value === inputEl.current.value
    setValue(evt.target.value)
    // eslint-disable-next-line radix
    setCounter(parseInt(inputEl.current.value))
  }

  return (
    <div>
      <h2>(1) Counter: {counter}</h2>
      <ButtonPair onIncrement={incrementCounter} onDecrement={decrementCounter} />
      <input ref={inputEl} type="number" onChange={handleChange} value={value} />
    </div>
  )
}

const Show = ({ msg }) => <div style={{ display: 'inline-block' }}>{msg}</div>

/**
 * 2. useRef + setInterval
 */
function CountRef() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState()
  const tref = useRef(count)

  useEffect(() => {
    const id = setInterval(() => {
      setMsg(`CountRef is: ${tref.current}`)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <h2>(2) ref.current: {count}</h2>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
          tref.current = count + 1
        }}
      >
        Increase
      </button>
      <Show msg={msg} />
    </div>
  )
}

/**
 * 3. setInterval + clearInterval
 */
function CountClearInterval() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState()

  // 让useEffect()知道闭包log()依赖于count，并在count改变时正确处理间隔的重置
  useEffect(() => {
    const id = setInterval(() => {
      setMsg(`CountClearInterval is: ${count}`)
    }, 2000)
    return function () {
      clearInterval(id)
    }
  }, [count])

  return (
    <div>
      <h2>(3) clearInterval: {count}</h2>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <Show msg={msg} />
    </div>
  )
}

export default function () {
  return (
    <div className="wrapper">
      <Counter />
      <CountRef />
      <CountClearInterval />
    </div>
  )
}
