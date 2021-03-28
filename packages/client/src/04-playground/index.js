import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetching } from '../config/fetch'
import { Fetcher } from '../containers'

/**
 * github: https://jobs.github.com/positions.json?search=javascript
 * faker
 * local.json
 */
const URL = 'https://api.github.com/users/'

/**
 * fetch also works, an option.
 */
const fetchGithub = searchKey => async () => {
  const response = await fetch(`${URL}${searchKey}`)
  const jsonData = await response.json()
  if (!response.ok) {
    throw new Error(response.statusCode)
  }
  return jsonData
}

const fetchingGithub = searchKey => async () => {
  const jsonData = await fetching(`${URL}${searchKey}`)
  return jsonData
}

function callMe() {
  return 'Called by Best IT Consulting Ltd.'
}

const renderGithub = data => <div>{JSON.stringify(data, null, 4)}</div>

export default function () {
  const [search, setSearch] = useState('williamjxj')
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  })
  const onSubmit = data => {
    setSearch(data.search)
  }

  return (
    <>
      <h1>Playground - Fetcher github</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="search" placeholder="what to search?" ref={register} />
        <button type="submit">Search</button>
      </form>
      <div style={{ margin: '2rem' }}>
        <h2>Promise: fetchingGithub({search})</h2>
        <Fetcher action={fetchingGithub(search)}>{data => renderGithub(data)}</Fetcher>
      </div>
      <hr />
      <div style={{ margin: '2rem' }}>
        <h2>String: api.github.com/users/{search}</h2>
        <Fetcher action={`https://api.github.com/users/${search}`}>{renderGithub}</Fetcher>
      </div>
      <hr />
      <div style={{ margin: '2rem' }}>
        <h2>pass Object: url, opts</h2>
        <Fetcher
          search={search}
          action={{
            url: '/api/v1/logout',
            opts: {
              method: 'get',
              needAuth: false,
            },
          }}
        >
          {renderGithub}
        </Fetcher>
      </div>
      <hr />
      <div style={{ margin: '2rem' }}>
        <h2>pass Function</h2>
        <Fetcher action={callMe}>{renderGithub}</Fetcher>
      </div>
    </>
  )
}
