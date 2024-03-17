



const User = require('../model/User')


const handleLogout =  async (req, res) => {
    //On the frontend(in the memory set it to blank when the button is clicked), on client also delete the access token


    const cookies = req.cookies
    //console.log(cookies);
    //console.log(cookies.jwt);
    if (!cookies ?.jwt) return res.sendStatus(204);
    //sending this response (no content i.e it is successful) to server if we do not receive a any cookie or a jwt method
    

    const refreshToken = cookies.jwt
    //is refreshToken is in db

    //checking if refreshtoken exists in the db
    const foundUser =await User.findOne({
        refreshToken
    }).exec();
    if (!foundUser) {
        //clear cookies
        res.clearCookie('jwt', { httpOnly : true });
        return res.sendStatus(204)
    };

//Delete refresh token in the database

foundUser.refreshToken = '';
const result = await foundUser.save()
console.log(result);

  

   res.clearCookie( 'jwt' , { httpOnly: true } )//in production add -> {secure : true} - only serves on https

   res.sendStatus(204)
}  


module.exports = { handleLogout }
