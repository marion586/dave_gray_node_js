const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname,'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

console.log("Hello ...")
process.on('uncaughtException', (err)=> {
    console.log(`There was an uncaught error : ${err}`)
    process.exit(1)
})

// fs.writeFile(path.join(__dirname,'files', 'reply.txt'),"nicetomeet you" , (err) => {
//     if (err) throw err;
//     console.log("write comple");

//     fs.appendFile(path.join(__dirname,'files', 'test.txt'),"testing text you" , (err) => {
//         if (err) throw err;
//         console.log("append comple");

//         fs.rename(path.join(__dirname,'files', 'test.txt'),path.join(__dirname, "files" , "newtest.txt") , (err) => {
//             if (err) throw err;
//             console.log("rename comple");
//         })
//     })
// })


const fsPromises = require('fs').promises;

const fileOps = async ()=> {

    try {
        const data = await fsPromises.readFile(path.join(__dirname, "files" , "starter.txt") , "utf-8")
        console.log(data)
        await fsPromises.unlink( path.join(__dirname, "files" , "starter.txt"))
        await fsPromises.writeFile(path.join(__dirname, "files" , "promiseWrite.txt"), data)
        await fsPromises.appendFile(path.join(__dirname, "files" , "promiseWrite.txt"), '\n\n nice tomeet you')
        await fsPromises.rename(path.join(__dirname, "files" , "promiseWrite.txt"), path.join(__dirname, "files" , "promiseWritenew.txt"))

        const newDat =  await  fsPromises.readFile( path.join(__dirname, "files" , "promiseWritenew.txt") , "utf-8")
        console.log(newDat)
        
    } catch (error) {
        console.log(err)
    }
}

fileOps()