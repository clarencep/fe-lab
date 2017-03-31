const path = require('path')
const glob = require('glob')
const child_process = require('child_process')
const fs = require('fs')
const cb2p = require('cb2p')
const co = require('co')
const rm = cb2p(require('rimraf'))
const rcopy = require('recursive-copy')
const {html, raw} = require('es6-string-html-template')

const extend = Object.assign

const sleep = cb2p((timeout, cb) => setTimeout(cb, timeout))

const PROJECT_ROOT = path.join(__dirname, '..')
const IGNORE_DIRECTORYS_PATTERN = /(^\.)|(bin)/

const exec = (cmd, args) => {
    console.log('[EXEC] ' + cmd + ' ' + args)

    args = !args ? [] : (typeof args === 'string' ? args.split(' ') : args)
    const res = child_process.spawnSync(cmd, args, {stdio: 'inherit', shell: true})

    if (res.error){
        throw res.error
    }

    if (res.status !== 0){
        throw extend(new Error('Command execution failed: `' + cmd + ' ' + args + '` returned status: ' + res.status), {detail: res})
    }

    return res
}

co(function *(){
    try {
        process.chdir(PROJECT_ROOT)

        const projects = [].concat(
            glob.sync('*/dist/index.html'),
            glob.sync('*/*/dist/index.html')
        ).filter(x => !IGNORE_DIRECTORYS_PATTERN.test(x))
        .map(x => x.replace(/\/dist\/index.html$/, ''))

        console.log("Got projects: ", projects)

        if (fs.existsSync('.pages')){
            yield rm('.pages')
        }
        
        console.log("Clone .pages from github...")
        exec('git', 'clone -b gh-pages git@github.com:clarencep/fe-lab.git .pages')
        console.log(".pages cloned.")
        
        console.log("Begin copy projects' pages...")
        const processing = projects.map(project => {
            console.log("processing project: " + project)
            return rcopy(path.join(project, 'dist'), path.join('.pages', project), {overwrite: true})
                .then(() => {
                    console.log("copied pages of project: " + project)
                })
                .catch(e => {
                    console.error("Error: failed to copy pages of project: " + project + "\n detail: ", e)
                    throw e
                })
        })


        yield Promise.all(processing)
        console.log("Copyed projects' pages. ")
        console.log(".pages: ", glob.sync('.pages/**/*'))
        console.log("")

        console.log("Build index page...")
        const indexPageHtml = renderIndexPageHtml(projects)
        fs.writeFileSync('.pages/index.html', indexPageHtml)
        console.log("Built index page.")

        console.log("Begin commiting pages...")
        process.chdir(".pages")
        exec('git', 'status')
        exec('git', 'add -A .')
        exec('git', 'commit --allow-empty -m auto-build-pages')
        exec('git', 'push origin gh-pages')
        exec('git', 'status')
        console.log("Commited pages.")

        process.chdir('..')
    } catch (e){
        console.error(e)
        process.exit(1)
    }
})

function renderIndexPageHtml(projects)
{
    projects = projects.map(path => ({ 
        link: path, 
        title: path.replace(/^[a-z]|-[a-z]/, x => x.replace('-', ' ').toUpperCase()).replace('Es6', 'ES6') 
    }))

    return `<!doctype html>` + html`<html>
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
    <title>Front End Lab (fe-lab)</title>
</head>
<body>
    <article>
        <h1>Front End Lab</h1>
        <h2>About This Project</h2>
        <p>This project is aimed at build project to test Front-End issues, features, bugs and etc.</p>
        <h2>Current Projects</h2>
        <ul>
            ${projects.map(project => html`<li><a href="${project.link}">${project.title}</a></li>`)}
        </ul>
    </article>
<!-- built files will be auto injected in the end of body element -->
</body>
</html>`
}
