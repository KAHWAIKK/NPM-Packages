

const allowedOrigins = [
    'https://www.yourdomain.com'/* only for request in your site will access your backend server */,
    'http://localhost:3500' , 
    'http://127.0.0.1:443',
    'http://127.0.0.1:5500'/* only your local server will access your backend server */,
    'https://www.google.com']

    module.exports = allowedOrigins