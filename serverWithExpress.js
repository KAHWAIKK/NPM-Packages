

//Creating a minimal express server app 
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger,/* logEvents */} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT  = process.env.PORT || 3500

/* MIDDLEWARE */


/* In Express.js, middleware refers to functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. Middleware functions can modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

Middleware functions in Express can be used for various purposes, such as logging, authentication, error handling, and more. They play a crucial role in extending and customizing the behavior of an Express application. */

//there are three types of middleware :Built-in , Custom-Middleware and third party middleware

//Custom middleware
//it is good practice to put custom middleware before built in middleware.
//An example of custom middleware is one that will log the request for the css or any other request e.g cusotom middleware logger. custom middleware need the next argument

//1.custom middleware logger -anonymous fn that takes 3 ar


app.use( logger)


/* THIRD PARTY MIDDLEWARE */

//A CORS middleware - cross origin resourse sharing
//whitelist allows one to specify resources that cors will not prevent to acces our backend
const whitelist = [
    'https://www.yourdomain.com'/* only for request in your site will access your backend server */,
    'http://localhost:3500' , 
    'http://127.0.0.1:5500'/* only your local server will access your backend server */,
    'https://www.google.com']

//create a function that will allow cors to prevent other users from accessing the backend server if not in the whitelist


/* this is from documentation */
const corsOptions = {
    origin : ( origin , callback) => {
        if ( whitelist.indexOf(origin) !== -1  || !origin 
        /* during development you would want to do this, you will remove it when you go live */ ) {
            callback( null , true)
        } else {
            callback( new Error (`not allowed to access by CORS!!`))
        }
    },
    optionsSuccessStatus : 200
    
}

/* you would want to take out the localhost server out but on;ly leave your domain site after development */

app.use(cors(corsOptions))//no more cors errors ,however this does leave it open,for a public api this would be fine but for private application you would want to use a whitelist 


//built-in middleware

//1. built in middleware to handle urlencoded data - i.e encoded data in the url is decoded into a parameter e.g form data


//Note we use app.use to apply middleware to all routes that are coming in
app.use(express.urlencoded({ extended: false}))

//2. built-in middleware to handle json data i.e if json data is submitted it helps get the data in the json object
app.use(express.json())

//3. built-in middleware to handle static files e.g files that should be available to the public e.g images, photos and css files

app.use(express.static(path.join(__dirname, '/public')))



//adding an express route

//we will use the get request
app.get('^/&|/index(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname, 'views' , 'index.html'))
})
//adding a second route
app.get('/new-page(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname, 'views' , 'new-page.html'))//sends the new-page.html file to the browser
})

//handling redirects with express
app.get('/old-page(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.redirect(301 ,'/new-page.html')//sends the new-page.html file to the browser
})

//chaining route handlers

const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res, ) => {
    console.log('three')
    res.send('Finished')
}


//adding a custom 404 error page

app.get('/*' , (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views' , '404.html'))//sends the 404.html file to the browser with a status code of 404
})

//Route handlers


//calling then in an array 
app.get('/chain(.html)?' , [one, two, three])



/* CREATING A CUSTOM ERROR HANDLER */

app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`server running on port ${PORT}`)
})