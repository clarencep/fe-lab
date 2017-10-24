const express = require('express')
const fs = require('fs')
const path = require('path')
const opn = require('opn')
const glob = require('glob')
const debug = require('debug')('http-server')
const EventSource = require('events')

let isBuilding = false
let isInAutoRefreshMode = false
let buildingError = null
let lastRefreshedTime = Date.now()

let httpServerEvents = new EventSource()

module.exports = {
    run,
    setIsBuilding: v => isBuilding = v,
    setBuildingError: err => buildingError = err,
    enableAutoRefreshMode: () => isInAutoRefreshMode = true,
    disableAutoRefreshMode: () => isInAutoRefreshMode = false,
    notifyNeedRefresh: () => {
        lastRefreshedTime = Date.now()
        httpServerEvents.emit('refresh')
    }
}

function run(PORT, HOST) {
    const app = express()

    const log = console
        .log
        .bind(console)

    const autoOpenBrowser = !process.argv[4]

    const FE_DIST = path.join(__dirname, '../../dist')

    app.get('/', function (req, res) {
        fs.readFile(path.join(FE_DIST, 'index.html'), 'utf8', function (err, data) {
            log(`${req.method} ${req.url}`)

            if (err) {
                if (isBuilding){
                    data = renderBuildingPage()
                } else {
                    data = renderErrorPage({error: err.message})
                }
            }

            if (('autoRefresh' in req.query && +req.query.autoRefresh) || (!('autoRefresh' in req.query) && isInAutoRefreshMode)) {
                data += renderAutoRefreshScript({now: Date.now()})
            }

            if (buildingError){
                data += renderBuildingError({error: buildingError})
            }

            res.set('Content-Type', 'text/html')
            res.end(data)
        })
    })

    app.get('/__refresh_event_source', function(req, res){
        let onRefresh = function(){
            debug("refreshed! pushing to clients...")

            if (res.finished){
                console.warn(req.ip + " response already finished. ignored.")
                cleanup()
                return
            }

            if (buildingError){
                res.write(`data: ${JSON.stringify({error: buildingError+''})}\n\n`)
            } else {
                res.write(`data: ${lastRefreshedTime}\n\n`)
            }
        }

        let cleanup = function(){
            httpServerEvents.removeListener('refresh', onRefresh)
        }

        debug(req.ip + ' begin request.')

        res.setTimeout(30000, cleanup)
        res.writeHead(200, {'Content-Type': 'text/event-stream'})
        res.write(`data: ${lastRefreshedTime}\n\n`)
        

        httpServerEvents.on('refresh', onRefresh)

        res.on('close', function(){
            debug(req.ip + ' closed request.')
            cleanup()
        })

        res.on('finish', function(){
            debug(req.ip + ' finished request.')
            cleanup()
        })
    })

    app.use(express.static(FE_DIST, {
        dotfiles: 'ignore',
        etag: true,
        extensions: [
            '.js',
            '.css',
            '.jpg',
            '.png',
            '.ico',
            '.json'
        ],
        index: false,
        maxAge: '1s',
        lastModified: true,
        redirect: false
    }))

    app.listen(PORT, HOST, function () {
        log(`listening on ${HOST}:${PORT}`)
        log(`you can visit it via http://${HOST}:${PORT}`)
        if (autoOpenBrowser) {
            opn(`http://${HOST === '0.0.0.0'
                ? '127.0.0.1'
                : HOST}:${PORT}`)
        }
    })
}


function renderAutoRefreshScript({now}){
    return `<script>
(function(){
    var lastRefreshedTime = ${now}
    var source = new EventSource('/__refresh_event_source')

    source.onmessage = function(e){
        if (!isNaN(e.data) && +e.data > lastRefreshedTime){
            lastRefreshedTime = e.data
            location.reload()
        } else if (isNaN(e.data)){
            try {
                var data = JSON.parse(e.data)
                if (data.error){
                    console.error(data.error)
                }
            } catch (e){
                console.error(e)
            }
        }
    }
})()
    </script>`
}

function renderBuildingPage(){
    return `<!doctype html>
<html>
<head><title>Building</title></head>
<body>
    <p>Building... Please wait a while.</p>
</body>
</html>`
}

function renderErrorPage({error}){
    return `<!doctype html>
<html>
<head><title>Error</title></head>
<body>
${error}
</body>
</html>`
}


function renderBuildingError({error}){
    return `<div class="building-error" style="position: fixed; width: 100%; bottom: 0; left: 0; right: 0; color: #ff0000; z-index: 99999999">
Build failed: ${error}
</div>`
}