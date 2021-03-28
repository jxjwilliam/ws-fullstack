import React, { useReducer } from 'react'

/**
 * https://usehooks.com
 */
function useToggle(initialValue = false) {
  return useReducer(state => !state, initialValue)
}
export default function () {
  const [isOn, toggleIsOn] = useToggle()

  return (
    <button type="button" onClick={toggleIsOn}>
      Turn {isOn ? 'Off' : 'On'}
    </button>
  )
}
