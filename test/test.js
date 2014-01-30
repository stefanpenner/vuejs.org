var spawn = require('child_process').spawn,
    browsers = ['chrome', 'firefox', 'safari']

browsers.forEach(run)
var done = 0

function run (browser) {
    var child = spawn('node', ['wd', browser], {
        stdio: 'inherit'
    })
    child.on('close', checkDone)
}

function checkDone (code) {
    done++
    if (done >= browsers.length) {
        console.log('all done!')
    }
}