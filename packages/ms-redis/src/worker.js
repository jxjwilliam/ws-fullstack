const fetchGithub = require('./fetchGithub')

/**
 * 2 ways to get data:
 * (1) auto periodly cronjob: cronjob.js
 * (2) manually: worker.js
 */


fetchGithub()
