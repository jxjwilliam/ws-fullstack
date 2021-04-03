import React, { useState } from 'react'
import Form from './form'
import { useFetch, getNutrition } from './utils'

export default function () {
  const [search, setSearch] = useState('')

  const sk = `/api/fruits/${search || 'all'}`
  const { loading, error, data: fruits } = useFetch(sk)

  return fruits ? (
    <div className="container">
      <Form search={search} setSearch={setSearch} />
      <div className="list">
        {loading && <p>Loading</p>}
        {error && <p>Error</p>}
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
    </div>
  ) : null
}
