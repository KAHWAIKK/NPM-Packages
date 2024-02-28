/* console.log('testing using nodemon npm'); */
//adding nodemon npm as a dev package/dependency to our application

//Using the installed npm date-fns package inside our application
//Using the installed npm uuid (prod dependency) package inside our application
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

//import common core modulesthe file system package,promises and path packages

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


//defining our logs function that we will export
const logEvents = async(message) => {
    const dateTime = `${format(new Date,'yyyy-MM-dd\nHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventsLog.txt'), logItem)
    } catch (err) {
        console.log(err)
    }
}

//Exporting logEvents funtion and we will use it in the index.js
module.exports =logEvents

// console.log(format(new Date,'yyyy-MM-dd\nHH:mm:ss'))
//2024-02-2812:13:46

// console.log(uuid())
//generates an id each time ab entry is made to the console