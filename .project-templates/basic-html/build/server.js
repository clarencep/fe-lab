const HOST = process.argv[2] || '0.0.0.0'
const PORT = process.argv[3] || 8080

const httpServer = require('./service/http-server.js')

httpServer.run(PORT, HOST)

