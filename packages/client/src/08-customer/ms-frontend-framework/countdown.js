import React, { useState, useEffect } from 'react'

const timeInMinutes = 10
const currentTime = Date.parse(new Date())
const deadline = new Date(currentTime + timeInMinutes * 60 * 1000)

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  }
}

/**
 * 我们创建一个变量total，以保留剩余时间直到截止日期。
 * 从用户到达起将计时器设置为10分钟
 */
export default function CountDown() {
  const [totals, setTotals] = useState(0)
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      const { total, days, hours, minutes, seconds } = getTimeRemaining(deadline)
      setDay(days)
      setHour(hours)
      setMin(minutes)
      setSecond(seconds)
      if (total <= 0) {
        setTotals(total)
        clearInterval(timerId)
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [totals])

  return (
    <div>
      <h2>(2) Countdown</h2>
      <div className="clockdown">
        <div>
          <span className="days">{day}</span>
          <div className="smalltext">Days</div>
        </div>
        <div>
          <span className="hours">{hour}</span>
          <div className="smalltext">Hours</div>
        </div>
        <div>
          <span className="minutes">{min}</span>
          <div className="smalltext">Minutes</div>
        </div>
        <div>
          <span className="seconds">{second}</span>
          <div className="smalltext">Seconds</div>
        </div>
      </div>
    </div>
  )
}
