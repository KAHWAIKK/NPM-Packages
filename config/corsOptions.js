



/* THIRD PARTY MIDDLEWARE */

//A CORS middleware - cross origin resourse sharing
//whitelist allows one to specify resources that cors will not prevent to acces our backend


/* you would want to take out the localhost server out but on;ly leave your domain site after development */


const allowedOrigins = require('./allowedOrigins');

//create a function that will allow cors to prevent other users from accessing the backend server if not in the whitelist


/* this is from documentation */
const corsOptions = {
    origin : ( origin , callback) => {
        if ( allowedOrigins.indexOf(origin) !== -1  || !origin 
        /* during development you would want to do this, you will remove it when you go live */ ) {
            callback( null , true)
        } else {
            callback( new Error (`not allowed to access by CORS!!`))
        }
    },
    optionsSuccessStatus : 200
    
}


module.exports = corsOptions;