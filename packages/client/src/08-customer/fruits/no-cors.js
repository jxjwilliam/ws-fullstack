import React, { useState } from 'react'
import Form from './form'
import { useFetch, getNutrition } from './utils'

export default function () {
  const [search, setSearch] = useState('')

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
  const { loading, error, data: fruits } = useFetch(`https://fruityvice.com/api/fruit/${search || 'all'}`, options)

  /**
   * 'all': return array
   * 'banana': return {}
   */
  return (
    <div className="container">
      <Form search={search} setSearch={setSearch} />
      {fruits ? (
        <div className="list">
          ){loading && <p>Loading</p>}
          {error && <p>{JSON.stringify(error)}</p>}
          {fruits.error && <p>{fruits.error}</p>}
          {fruits.length > 0 && (
            <ul className="ul">
              {fruits.map(({ name, family, nutritions }) => (
                <li key={name}>
                  {name}, {family}, {getNutrition(nutritions)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <h4>Error</h4>
          <pre style={{ textAlign: 'left', paddingLeft: '6rem' }}>
            <code>{JSON.stringify({ ...error, ...options }, null, 2)}</code>
          </pre>
        </>
      )}
    </div>
  )
}
