import React, { useState, useEffect } from 'react'
import { FaBeer } from 'react-icons/fa'

const URL = 'https://hn.algolia.com/api/v1/search'

// https://www.robinwieruch.de/react-hooks-fetch-data
// https://codesandbox.io/s/jvvkoo8pq3
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await fetch(url)
        const json = await result.json()
        if (!ignore) setData(json)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [url])

  return [{ data, isLoading, isError }, setUrl]
}

export default function Algolia() {
  const [query, setQuery] = useState('redux')
  const [{ data, isLoading, isError }, doFetch] = useDataApi(`${URL}?query=redux`, {
    hits: [],
  })

  const handleChange = event => {
    setQuery(event.target.value)
  }

  const handleSubmit = event => {
    doFetch(`${URL}?query=${query}`)
    event.preventDefault()
  }

  return (
    <div className="container">
      <h3 style={{ marginTop: 0 }}>
        Cheers with <FaBeer />
      </h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul className="ul">
          {data.hits.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a className="App-link" href={url}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
