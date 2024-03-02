//common core module
//HTTP,PATH,FILE SYSTEM -FILE SYSTEM PROMISES
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');


//we first define an eventemitter
const EventEmitter = require('events')
 //next we define a class

class MyEventEmitter extends EventEmitter {};

//initialize the object we will create
const myEventEmitter = new MyEventEmitter();

//add a listener for the log event

myEventEmitter.on('log'/* type of event to listen to */,(msg, fileName) => logEvents(msg,fileName))


//defining a port
const PORT = process.env.PORT /* if we were to host the server somewhere else, it would use this information */|| 3500 ;/* we will be using port 3500 since we will host our serverlocally */

//creating a function that we can call for serving our main file or a 404 file

const serveFile = async (filePath, contentType, response) => {
    try {
        //getting data from the file
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8': ''
            );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 400 : 200, 
            { 'Content-Type': contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )

    }catch (err) {
        console.log(err);
        myEventEmitter.emit('log',`${err.name}: ${err.message}`, 'errorLog.txt')
        response.statusCode = 500
        response.end();
    }
}


//create the minimal server

const server = http.createServer((req,res) => {
    console.log(req.url , req.method);//returns  (/) /* for the url */
    //GET as the method

    myEventEmitter.emit('log',`${req.url}\t${req.method}`, 'reqLog.txt')
        /* We could also build a path for the server too */
    const extension = path.extname(req.url)

    //defing content-Type by using a switch statement
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default :
            contentType = 'text/html';
    }

    /* setting file path using chain ternary statements */
    let filePath = 
        /* first condition */
        // if content type is text/html and request url is '/', then set the filePath variable to views directory  and send it to index.html
            contentType === 'text/html' && req.url === '/' ?
            path.join(__dirname, 'views', 'index.html') 

        /* second condition */
        //if the contentType is a text/html file and the last character in the url path is a slash(/), this accounts for subdirectories and not just the main directory, then set the filePath variable to
            :contentType === 'text/html' && req.url.slice(-1) === '/' ?
            path.join(__dirname, 'views', 'index.html')
            
        /* third condition */
        //if contentType === 'text/html' then we would look in the views folder for the index.html file
            :contentType === 'text/html' ?
                path.join(__dirname, 'views', req.url) 
                //however if that is not the case then we will just use the directory name and file path as the req url
                : path.join(__dirname, req.url)
        /* makes the .html extension not required in the browser */
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    /* checking if the requested file exists */
    const fileExists = fs.existsSync(filePath);

    if(fileExists) {
        //serve the file
        serveFile(filePath,contentType,res)
    }else {
        //404
        //301 (redirect)
        //console.log(path.parse(filePath));
        //log the different paths of the filepath, can help us route the redirect
       /*  {
            root: 'E:\\',
            dir: 'E:\\NODEJS\\Basics2',
            base: 'old.html',
            ext: '.html',
            name: 'old'
          } */
          //we will use the base property to route the redirect
        switch (path.parse(filePath).base){
            //first case isa scenarion where we had an old page and we want to redirect ni to our new page
            case 'old-page.html':
                //
                res.writeHead(301/* a redirect is a status code of 301 */ , /* value of the header */{'Location' :'/new-page.html'})
                res.end();
                break;
            //handle our second case
            case 'www-page.html':
                res.writeHead(301/* a redirect is a status code of 301 */ , /* value of the header */{'Location' :'/'/* it woll redirect to the homepage */})
                res.end();
                break;
            default:/* the default case should be the 404 error page */

            serveFile(path.join(__dirname, 'views', '404.html'),'text/html',res)

        }
    }
})

//launching the server by setting it to listen method. Lways have this at the end of the server.js file
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    }
)
 

//add a listener for the log event

// myEventEmitter.on('log'/* type of event to listen to */,(msg) => logEvents(msg))

// myEventEmitter.emit('log','Log event emitted!')

/* setTimeout(() => {
    //Emit event
    myEventEmitter.emit('log','Log event emitted!')
 }, 2000
 //after 2 seconds it returns 2024-02-2816:22:34      b2488977-ba59-4de7-ac37-9c89390f9252Log event emitted! 
) */

/* This is how you listen for and emit events for many sorts of actions like when we create a webserver, we want to emit events for what requests came in and log all of those that that we have a detailed activity*/


/* You will notice that if you type  (http://localhost:3500/data/data.json) in the adress bat for a GET request for the data.json file inside of the data folder that we receive not the accurate file type*/