import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * https://dev.to/alterclass/5-react-custom-hooks-you-should-start-using-explained-5d18
 * - useFetch
 * - useEventListener
 * - useLocalStorage
 * - useMediaQuery
 * - useDarkMode
 */
export const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    fetch(url, options)
      .then(res => res.json())
      .then(data1 => {
        if (isMounted) {
          setData(data1)
          setError(null)
        }
      })
      .catch(error1 => {
        if (isMounted) {
          setError(error1)
          setData(null)
        }
      })
      .finally(() => isMounted && setLoading(false))

    // eslint-disable-next-line no-return-assign
    return () => (isMounted = false)
  }, [url, options])

  return { loading, error, data }
}

export const useEventListener = (eventType = '', listener = () => null, target = null, options = null) => {
  const savedListener = useRef()

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    if (!target?.addEventListener) return

    const eventListener = event => savedListener.current(event)

    target.addEventListener(eventType, eventListener, options)

    // eslint-disable-next-line consistent-return
    return () => {
      target.removeEventListener(eventType, eventListener, options)
    }
  }, [eventType, target, options])
}

const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setLocalStorageState = newState => {
    try {
      const newStateValue = typeof newState === 'function' ? newState(state) : newState
      setState(newStateValue)
      window.localStorage.setItem(key, JSON.stringify(newStateValue))
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`)
    }
  }

  return [state, setLocalStorageState]
}

const useMediaQuery = (queries = [], values = [], defaultValue) => {
  const mediaQueryList = queries.map(q => window.matchMedia(q))

  const getValue = useCallback(() => {
    const index = mediaQueryList.findIndex(mql => mql.matches)
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }, [mediaQueryList, values, defaultValue])

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)
    mediaQueryList.forEach(mql => mql.addEventListener('change', handler))

    return () => mediaQueryList.forEach(mql => mql.removeEventListener('change', handler))
  }, [getValue, mediaQueryList])

  return value
}

export const useDarkMode = () => {
  const preferDarkMode = useMediaQuery(['(prefers-color-scheme: dark)'], [true], false)

  const [enabled, setEnabled] = useLocalStorage('dark-mode', preferDarkMode)

  useEffect(() => {
    if (enabled) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [enabled])

  return [enabled, setEnabled]
}

export const themes = {
  light: {
    foreground: 'rebeccapurple',
    background: '#eeeeee',
  },
  dark: {
    foreground: 'white',
    background: '#222222',
  },
}

export const ThemeContext = React.createContext(null)

/**
 * createContext, Context.Provider
 * Context.Consumer,useContext(MyContext) = (static contextType = MyContext)  = <MyContext.Consumer>.
 * 2-3 files involved:
 *  - provider: themes, createContext, Provider
 *  - switch-button: useContext(Provider) -> dispatch/toggle/set
 *  - theme-style: useContext(ThemeContext) -> theme
 */
export function MyTheme({ children }) {
  const [themeName, setThemeName] = React.useState('light')
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light')
  }
  return <ThemeContext.Provider value={[themeName, toggleTheme]}>{children}</ThemeContext.Provider>
}
