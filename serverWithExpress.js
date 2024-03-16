

//Creating a minimal express server app 
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger,/* logEvents */} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')

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

//Handle options credentials check - before CORS!
//add fetch cookies credentials requirement 

app.use(credentials)

//CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions))//no more cors errors ,however this does leave it open,for a public api this would be fine but for private application you would want to use a whitelist 


//built-in middleware

//1. built in middleware to handle urlencoded data - i.e encoded data in the url is decoded into a parameter e.g form data


//Note we use app.use to apply middleware to all routes that are coming in
app.use(express.urlencoded({ extended: false}))

//2. built-in middleware to handle json data i.e if json data is submitted it helps get the data in the json object
app.use(express.json())


//middleware for cookies
app.use(cookieParser())
//3. built-in middleware to handle static files e.g files that should be available to the public e.g images, photos and css files

app.use(express.static(path.join(__dirname, '/public')))
/* app.use('/subdir' ,express.static(path.join(__dirname, '/public'))) */



//adding an express route


//applying the route

app.use('/' , require('./routes/root'))
/* app.use('/subdir' , require('./routes/subdir')) */

//adding the register router
app.use('/register' , require('./routes/register'))
//adding the authorization router
app.use('/auth' , require('./routes/auth'))
app.use('/refresh' , require('./routes/refresh'))
app.use('/logout' , require('./routes/logout'))


//creating a REST API router

app.use(verifyJWT);//any route after this will use JWT token for authorization i.e since middleware gets implemented like a waterfall, the routes above will not have JWT token authorization
app.use('/employees' , require('./routes/api/employees'))

//adding a custom 404 error page

app.get('/*' , (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views' , '404.html'))//sends the 404.html file to the browser with a status code of 404
})


/* CREATING A CUSTOM ERROR HANDLER */

app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`server running on port ${PORT}`)
})