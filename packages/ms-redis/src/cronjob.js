const CronJob = require('cron').CronJob;
const fetchGithubJobs = require('./fetchGithub')

const job = new CronJob('* * * * *', fetchGithubJobs, null, true, 'America/Los_Angeles');

job.start();
