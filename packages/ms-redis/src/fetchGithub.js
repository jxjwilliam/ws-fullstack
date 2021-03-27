const fetch = require('node-fetch')
const redis = require('redis')
const { promisify } = require('util')
const dayjs = require('dayjs')

const convertTime = ts => dayjs(ts).format('YYYY-MM-DD')
require('dotenv').config({ path: `${__dirname}/../.env` })

const BASEURL = 'https://jobs.github.com/positions.json' // ?search=node
const github = process.env.REDIS_GITHUB
const github_custom = process.env.REDIS_GITHUB_CUSTOM

const client = redis.createClient()
const setAsync = promisify(client.set).bind(client)

async function fetchGithub() {
  let [resultCount, page] = [1, 0]
  const all = []

  // 1. reset
  await setAsync(github, '')
  await setAsync(github_custom, '')

  // 2. fetch
  while (resultCount > 0) {
    const res = await fetch(`${BASEURL}?page=${page}`)
    const jobs = await res.json()
    all.push(...jobs)
    resultCount = jobs.length
    console.log(`got ${resultCount} jobs...`)
    page += 1
  }

  // 3. convert time: 'Tue Jan 19 20:56:53 UTC 2021' -> '2021-01-19'
  all.forEach(job => (job.created_at = convertTime(job.created_at)))

  // 4. filter algo 算法
  const filters = ['senior', 'manager', 'lead', 'architect', 'director']
  const customJobs = all.filter(job => {
    const title = job.title.toLowerCase()
    return filters.some(filter => title.includes(filter))
  })

  // 5. set in redis
  console.log(`got TOTAL ${all.length} jobs.`)
  console.log(`custom ${customJobs.length} jobs.`)

  const saveAll = await setAsync(github, JSON.stringify(all))
  console.log({ success: saveAll })

  const saveCustom = await setAsync(github_custom, JSON.stringify(customJobs))
  console.log({ success: saveCustom })
}

module.exports = fetchGithub
