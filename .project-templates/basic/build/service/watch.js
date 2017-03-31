const webpack = require('webpack')
const webpackConfig = require('../webpack.conf')
const moment = require('moment')
const rm = require('rimraf')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

const watchingEvent = new EventEmitter()

module.exports = {
    on: watchingEvent.on.bind(watchingEvent),
    run: function(){
        console.log("Cleaning old files...")
        rm(webpackConfig.output.path, function(){
            webpackConfig.watch = true

            console.log("Begin build...")
            webpack(webpackConfig, function(err, stats){
                watchingEvent.emit('built', {err, stats})

                if (err){
                    console.error("Build failed:")
                    console.error(err)
                    return
                }

                process.stdout.write(stats.toString({
                        colors: !+process.env.DISABLE_OUTPUT_COLOR,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n')               
            })
        })
    }
}

function parseNameAndHash(file){
    let matches = file.match(/^(.*)\.([a-z0-9]+)(\.\w+)$/)
    if (!matches){
        return [file, '']
    }

    let [baseName, hash, extName] = matches
    return [baseName + extName, hash]
}