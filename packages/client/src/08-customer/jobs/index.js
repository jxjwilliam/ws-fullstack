import React, { useState, useEffect } from 'react'
import { fetching } from '../../config/fetch'
import Jobs from './jobs'

const JOB = {
  all: 'http://localhost:8076/api/jobs/github',
  custom: 'http://localhost:8076/api/jobs/github_custom',
  all1: '/api/jobs/github',
  custom1: '/api/jobs/github_custom',
}

// access ms-redis by proxy
function fetchingGit(url, title) {
  return () => {
    const [list, updateList] = useState([])

    useEffect(() => {
      fetching(url).then(updateList)
    }, [])

    return (
      <div className="App">
        <Jobs jobs={list} title={title} />
      </div>
    )
  }
}

// const GitAll = fetchGit(JOB.all)
// const GitCustom = fetchGit(JOB.custom)
const GitAll = fetchingGit(JOB.all1, 'github jobs')
const GitCustom = fetchingGit(JOB.custom1, 'custom(senior,manager,lead,architect,director)')

export { GitAll, GitCustom }
