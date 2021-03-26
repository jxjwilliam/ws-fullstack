const express = require('express')
const redis = require('redis')
const { promisify } = require('util')

require('dotenv').config()

const port = process.env.REDIS_PORT
const github = process.env.REDIS_GITHUB
const github_custom = process.env.REDIS_GITHUB_CUSTOM

const app = express()
const client = redis.createClient()
const getAsync = promisify(client.get).bind(client);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})


/**
 * github: https://jobs.github.com/positions
 */
app.get('/api/jobs/github', async (req, res) => {
  const jobs = await getAsync(github)
  res.send(jobs)
})

app.get('/api/jobs/github_custom', async (req, res) => {
  const jobs = await getAsync(github_custom)
  res.send(jobs)
})

/**
 * indeed
 */
app.get('/api/jobs/indeed', (req, res) => {
  res.json({})
})

/**
 * stackoverflow
 */
app.get('/api/jobs/stackoverflow', (req, res) => {
  res.json({})
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Redis Caching Server is listening at http://localhost:${port}`)
})
