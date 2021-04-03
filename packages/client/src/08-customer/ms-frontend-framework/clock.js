import React, { useState, useEffect } from 'react'
import CountDown from './countdown'

function Clock() {
  const date = new Date().toLocaleDateString()
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timerId)
  }, [time])
  return (
    <div>
      <h2>
        (1) DateTime: {date}, {time}
      </h2>
    </div>
  )
}

export default () => (
  <div className="wrapper">
    <Clock />
    <CountDown />
  </div>
)

/**
 * 当一个返回基于前一个状态的新状态的回调函数被提供给状态更新函数时，
 * React确保将最新的状态值作为该回调函数的参数提供
 * https://dmitripavlutin.com/react-hooks-stale-closures/
 * setCount(alwaysActualStateValue => newStateValue);
 */
