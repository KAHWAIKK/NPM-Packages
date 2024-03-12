

//Creating a minimal express server app 
const express = require('express');
const app = express();
const path = require('path');
const PORT  = process.env.PORT || 3500


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

//adding a custom 404 error page

app.get('/*' , (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views' , '404.html'))//sends the 404.html file to the browser with a status code of 404
})

//Route handlers





app.listen(PORT , () => {
    console.log(`server running on port ${PORT}`)
})