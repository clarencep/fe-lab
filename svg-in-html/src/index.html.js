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

    <h3>0. 使用svg标签</h3>
    <svg version="1.1"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 660 342"
        width="660" height="342"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="display:block;width:330px;height:240px" >

        <image xlink:href="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" width="660" height="342"/>

        <rect x="2" y="284" width="656" height="58" fill="rgba(0,0,0,0.6)" stroke-width="1" ></rect>

        <text text-anchor="start"
            font-family="Microsoft Yahei, sans-serif" font-size="28"
            x="20" y="322" fill="#fff">这是百度</text>
        <text text-anchor="end"
            font-family="Microsoft Yahei, sans-serif" font-size="28"
            x="640" y="322" fill="#fff">😄</text>
    </svg>

    <h3>1. 使用img标签</h3>
    <img src="./test.svg" style="display:block;width:330px;height:240px" />

    <h3>2. 使用iframe标签</h3>
    <iframe src="./test.svg" style="display:block;width:330px;height:240px;border:none;" ></iframe>

    <h3>3. 使用embed标签</h3>
    <embed src="./test.svg" style="display:block;width:330px;height:240px" />

    <h3>4. 使用object标签</h3>
    <object type="image/svg+xml" data="./test.svg" style="display:block;width:330px;height:240px" >
        <param name="src" value="./test.svg" >
    </object>


    <h3>5. 使用div标签的背景图片</h3>
    <div style="display:block;width:330px;height:240px;background: url(./test.svg) no-repeat;background-size: 100%;" ></div>


    <h3>6. 使用picture标签</h3>
    <picture >
        <source srcset="./test.svg"  type="image/svg+xml">
        <img src="./test.png" style="display:block;width:330px;height:240px">
    </picture>

</body>
</html>`
}