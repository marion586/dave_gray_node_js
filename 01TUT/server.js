//you should alreadyknow;
//html,css , and , Javascript
//Possibly experience with other libraries and frameworks

//how NodeJS differs from Vanilla JS
//NodeJS is a runtime environment that allows you to run JavaScript on the server side.
//Vanilla JS typically refers to JavaScript running in the browser.
//the console is terminal windows

console.log("Hello from NodeJS");


//3 glbal object instead of window object

console.log(global);

// 4) Has common Core modules that we will explore
// 5) Uses CommonJS module system (require and module.exports) instead of ES6 import/export
// 6) Asynchronous and Event Driven (non-blocking I/O model)
// 7) Single Threaded but can handle concurrency using event loop and callbacks
// 8) missing some JS APIS like fetch

const os = require('os');
const path = require('path');
const math = require('./math.js');
// or

const {add, subtract, multiply, divide} = require('./math.js');

console.log(math.add(2,3));
console.log(math.subtract(5,3));
console.log(math.multiply(4,3));
console.log(math.divide(10,2));

console.log(os.type())
console.log(os.version())
console.log(os.homedir())
console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))


console.log(path.parse(__filename))