const logEvents = require('./logEvents')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {

}

//initialize object
const myEmitter = new MyEmitter()

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg))

//emit event
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!')
}, 2000);

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted again!')
}, 4000);

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted one more time!')
}, 6000);