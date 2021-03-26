const http = require('http')
const debug = require('debug')('express:server')
const app = require('./app')

const port = normalizePort(app.get('port'))
const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// 使用pm2 和如下处理，来避免服务crash。
process.on('uncaughtException', function (err) {
  console.error(`ms-dbms uncaughtException异常: ${err}`)
})

process.on('unhandledRejection', function (reason, promise) {
  console.error('ms-dbms unhandledRejection异常: ', promise, 'reason:', reason)
})

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`🈚️ ${bind} 需要提升的特权`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`⛳️ ${bind} 已在使用中`)
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`✈ ms-dbms 服务正运行在端口 ${bind}`)
}
