const { PythonShell } = require('python-shell')

console.log({ here: 1 })
const options = { args: [ 'testing123' ] }
PythonShell.run('./lib/test.py', options, (err, data) => {
    if (err) { console.log({ err }) }
    console.log({ data })
})
