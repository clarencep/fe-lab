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
            // yield rm('.pages')
            console.log('.pages exists, try to update it')
            process.chdir('.pages')
            exec('git', 'checkout gh-pages')
            exec('git', 'reset --hard origin/gh-pages')
            exec('git', 'pull --no-edit origin gh-pages')
            process.chdir('..')
            console.log(".pages updated.")
        } else {
            console.log("Clone .pages from github...")
            exec('git', 'clone --depth 1 -b gh-pages git@github.com:clarencep/fe-lab.git .pages')
            console.log(".pages cloned.")
        }        
        
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
        link: path + '/', 
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
    <a href="https://github.com/clarencep/fe-lab"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>

    <article>
        <h1>Front End Lab</h1>
        <h2>About This Project</h2>
        <p>This project is aimed at build project to test Front-End issues, features, bugs and etc.</p>
        <h2>Current Projects</h2>
        <ul>
            ${projects.map(project => html`<li><a href="${project.link}">${project.title}</a></li>`)}
        </ul>
    </article>

    <!-- Global Site Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-67440907-4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)};
      gtag('js', new Date());
    
      gtag('config', 'UA-67440907-4');
    </script>
    
<!-- built files will be auto injected in the end of body element -->
</body>
</html>`
}
