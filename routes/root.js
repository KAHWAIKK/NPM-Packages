const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/&|/index(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname,'..', 'views' , 'index.html'))
})
//adding a second route
router.get('/new-page(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname,'..', 'views' , 'new-page.html'))//sends the new-page.html file to the browser
})

//handling redirects with express
router.get('/old-page(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.redirect(301 ,'/new-page.html')//sends the new-page.html file to the browser
})


module.exports = router;
