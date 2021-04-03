import React, { useState } from 'react'
import Form from './form'
import fruitsList from './fruit.json'
import { getNutrition } from './utils'

export default function () {
  const [search, setSearch] = useState('')
  const [fruits, setFruits] = useState(fruitsList)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const searching = () => {
    setLoading(true)
    setError(null)
    setFruits(null)
    setTimeout(() => {
      try {
        const filtered = fruitsList.filter(({ name }) => name.toLowerCase().includes(search))
        setFruits(filtered)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="wrapper">
      <Form search={search} setSearch={setSearch} callback={searching} />
      <div className="list">
        {loading && <p>Loading</p>}
        {error && <p>Error</p>}
        {fruits?.length === 0 && <p>No Fruit {search}</p>}
        {fruits?.length > 0 && (
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
  )
}
