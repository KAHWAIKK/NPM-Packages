



/* THIRD PARTY MIDDLEWARE */

//A CORS middleware - cross origin resourse sharing
//whitelist allows one to specify resources that cors will not prevent to acces our backend


/* you would want to take out the localhost server out but on;ly leave your domain site after development */


const whitelist = [
    'https://www.yourdomain.com'/* only for request in your site will access your backend server */,
    'http://localhost:3500' , 
    'http://127.0.0.1:443',
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


module.exports = corsOptions;