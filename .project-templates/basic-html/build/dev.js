require('./prepare')

const HOST = process.argv[2] || '0.0.0.0'
const PORT = process.argv[3] || 8080

const httpServer = require('./service/http-server.js')
const watch = require('./service/watch.js')
const debug = require('debug')('dev')

httpServer.enableAutoRefreshMode()
httpServer.setIsBuilding(true)

watch.on('built', function({err, stats}){
    httpServer.setIsBuilding(false)
    debug("watch service built.")

    httpServer.setBuildingError(err || (stats.hasErrors() && stats.toString()))
    httpServer.notifyNeedRefresh()
})

watch.run()

httpServer.run(PORT, HOST)


