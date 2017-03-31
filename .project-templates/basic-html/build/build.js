const webpack = require('webpack')
const webpackConfig = require('./webpack.conf')
const moment = require('moment')
const rm = require('rimraf')

console.log("Begin build...")

rm(webpackConfig.output.path, function(){
    webpack(webpackConfig, function(err, stats){
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