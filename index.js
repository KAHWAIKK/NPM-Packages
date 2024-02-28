/* console.log('testing using nodemon npm'); */


//Using the installed npm date-fns package inside our application

const { format } = require('date-fns');

//Using the installed npm uuid (prod dependency) package inside our application

const { v4: uuid } = require('uuid');

//adding nodemon npm as a dev package/dependency to our application

console.log(format(new Date,'yyyy-MM-dd\nHH:mm:ss'))//2024-02-2812:13:46

console.log(uuid())//generates an id each time ab entry is made to the console