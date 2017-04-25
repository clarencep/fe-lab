// This file is a template file for HtmlWebpackPlugin

const showdown = require('showdown')
const fs = require('fs')
const path = require('path')
const {html, raw} = require('es6-string-html-template')

module.exports = function(params){
    let readmeMd = fs.readFileSync('README.md', 'utf8')
    let title = readmeMd.trim().replace(/(^#+\s*)|([\n\r].*)/g, '').trim()
    let readmeHtml = (new showdown.Converter()).makeHtml(readmeMd)

    const projectName = path.basename(path.dirname(path.dirname(params.htmlWebpackPlugin.options.template.replace(/^.*!/, ''))))

    return '<!doctype html>' + html`<html>
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport" id="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="width">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="applicable-device" content="mobile">
    <meta name="format-detection" content="telephone=no">
    <title>${title}</title>
</head>
<body>
    <a href="https://github.com/clarencep/fe-lab/tree/master/${projectName}"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>

    <article>${raw(readmeHtml)}</article>
    <!-- built files will be auto injected in the end of body element -->
</body>
</html>`
}
