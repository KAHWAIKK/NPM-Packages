const express = require('express');
const router = express.Router();
const path = require('path');



router.get('^/&|/index(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname, '..', 'views','subdir' , 'index.html'))
})


router.get('^/&|/test(.html)?', (req, res) => {
    //res.send(`hello world`)
    //the browser tab has the words hello world
    //for the get request we will send hello world to the front end(index page)

    //lets go ahead and serve the index page that is in our views folder
    res.sendFile(path.join(__dirname, '..', 'views','subdir' , 'test.html'))
})


module.exports = router;