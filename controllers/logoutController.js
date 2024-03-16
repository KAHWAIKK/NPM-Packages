



const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}


const fsPromises = require('fs').promises//we will use the fs promises as we r  still using our json file and have not connected to  a database yet. once you connect to a db you will replace it here
const path = require('path')


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
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        //clear cookies
        res.clearCookie('jwt', { httpOnly : true });
        return res.sendStatus(204)
    };

 /*    //evaluate jwt
   jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
        const accessToken = jwt.sign(
            {"username": decoded.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "35s"}
        )
        res.json({accessToken})
    }
   ) */

   //Delete refresh token in the database

   const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);

   const currentUser = {...foundUser, refreshToke : ''}
   usersDB.setUsers([...otherUsers, currentUser])
   await fsPromises.writeFile(
    path.join(__dirname, '..', 'model' , 'users.json'),
    JSON.stringify(usersDB.users)
   )

   res.clearCookie( 'jwt' , { httpOnly: true } )//in production add -> {secure : true} - only serves on https

   res.sendStatus(204)
}  


module.exports = { handleLogout }
