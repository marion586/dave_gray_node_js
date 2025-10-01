
const http =  require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises



const PORT = process.env.PORT || 3500   
const logEvents = require('./logEvents')

const EventEmitter = require('events')

class Emitter extends EventEmitter {

}

//initialize object
const myEmitter = new Emitter()
myEmitter.on('log', (msg,filename) => logEvents(msg,filename))
const serveFile = async (filePath, contentType, response) => {

    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image') ? 'utf8' : '')
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes('404.html')?404:200, {'Content-Type': contentType}
        )
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data  
        )
    } catch (error) {
        console.log(error)
         myEmitter.emit('log', `${error.name}\t${error.message}`, 'errLog.txt ')
        response.statusCode = 500
        response.end()
    }
}
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt ')
    // let filePath;
    // if(req.url === '/' || req.url === 'index.html' ) {

    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'text/html')
    //     filePath = path.join(__dirname, 'views', 'index.html')
    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //         if(err) {
    //             console.log(err)
    //             res.statusCode = 500
    //             res.end()
    //         } else {
    //             res.end(data)
    //         }
    //     })
    // }
    const extension = path.extname(req.url)
    console.log(extension , "extenstion")
    const contentType = 
        extension === '.css' ? 'text/css' :
        extension === '.js' ? 'text/javascript' :
        extension === '.json' ? 'application/json' :
        extension === '.jpg' ? 'image/jpeg' :
        extension === '.png' ? 'image/png' :
        extension === '.txt' ? 'text/plain' :
        'text/html'
    console.log(contentType, "contentType")
    let filePath = 
        contentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'views', 'index.html') :
        contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html') :
        contentType === 'text/html' ? path.join(__dirname, 'views', req.url) :
        path.join(__dirname, req.url)

        console.log(filePath , "filepath")

        // makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html'
    const fileExists = fs.existsSync(filePath)
    console.log(fileExists, "fileExists")
    if(fileExists) {
        //server the file
        serveFile(filePath, contentType, res)
    }
    else {
        //404
        //301 redirect
        console.log(path.parse(filePath))
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'})
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'})
                res.end()
                break;
            default:
                //404
                // res.statusCode = 404
                // res.setHeader('Content-Type', 'text/html')
                // filePath = path.join(__dirname, 'views', '404.html')
                // fs.readFile(filePath, 'utf8', (err, data) => {
                //     if(err) {
                //         console.log(err)
                //         res.statusCode = 500
                //         res.end()
                //     } else {
                //         res.end(data)
                //     }
                // })
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
                break;
        }
    }
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//add listener for the log event


// //emit event
// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted!')
// }, 2000);

// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted again!')
// }, 4000);

// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted one more time!')
// }, 6000);