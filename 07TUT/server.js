
const path = require('path')
const express = require('express')
const app = express()
const {logger} = require('./middleware/logEvents');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

//custom middleware logger

app.use(logger)
//Cross origin Ressource Shareing

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://127.0.0.1:3500' , 'http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {console.log(origin)
        if (whitelist.indexOf(origin) !==-1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    }
    ,optionSuccessStatus: 200
}


app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))//to handle form data
app.use(express.json()) //to handle json data
app.use(express.static(path.join(__dirname, 'public')))
app.get(/^\/$|index(.html)?/,(req, res)=> {
    res.sendFile(path.join(__dirname, "views", "index.html"))
    //or res.sendFile('./views/index.html', {root: __dirname})
})
app.get('/new-page.html',(req, res)=> {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
})
app.get(/\/old-page(.html)?/,(req, res)=> {
    res.redirect(301,'/new-page.html') //302 by default
})

//route handlers
app.get(/\/hello(.html)?/,(req, res, next)=> {
    console.log('attempted to load hello.html')
    next()
} , (req, res)=> {
    res.send('Hello World')
})


const PORT = process.env.PORT || 3500   
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


const one = (req, res, next) => {
    console.log('one')
    next()
}
const two = (req, res, next) => {
    console.log('two')
    next()
}
const three = (req, res, next) => {
    console.log('three')
    res.send('Finished!')
}
app.get(/\/chain(.html)?/, [one, two, three])


//app.use('/')
app.use((req, res) => {
    res.status(404)

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
