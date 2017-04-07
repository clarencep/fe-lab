// This file is a template file for HtmlWebpackPlugin

const showdown = require('showdown')
const fs = require('fs')
const path = require('path')
const {html, raw} = require('es6-string-html-template')

module.exports = function(params){
    let readmeMd = fs.readFileSync('README.md', 'utf8')
    let title = readmeMd.trim().replace(/(^#+\s*)|([\n\r].*)/g, '').trim()
    let readmeHtml = (new showdown.Converter()).makeHtml(readmeMd)

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
    <article>${raw(readmeHtml)}</article>
    <!-- built files will be auto injected in the end of body element -->
</body>
</html>`
}
