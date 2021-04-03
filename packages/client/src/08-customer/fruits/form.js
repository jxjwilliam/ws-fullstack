import React, { useRef } from 'react'

export default function ({ search, setSearch, callback }) {
  const ref = useRef(null)

  const handleSearch = evt => {
    const keyword = evt.target.value.toLowerCase().trim()
    setSearch(keyword)
  }

  const handleSubmit = event => {
    const keyword = ref.current.value.toLowerCase().trim()
    setSearch(keyword)
    // for `local` case
    if (typeof callback === 'function') callback()

    ref.current?.focus()
    event.preventDefault()
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} ref={ref} placeholder="enter fruit name please" onChange={handleSearch} />
        <button type="submit"> 🔎 Search Fruityvice!</button>
      </form>
    </div>
  )
}
