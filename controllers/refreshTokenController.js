



const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}

/* const bcrypt = require('bcrypt'); */


//pull the jsonwebtoken package

const jwt = require('jsonwebtoken')
require('dotenv').config()
/* const fsPromises = require('fs').promises 
//as we have not intergrated any database and we are still working with our dev file
const path = require('path') */


const handleRefreshToken =  (req, res) => {
    const cookies = req.cookies
    if (!cookies ?.jwt) return res.sendStatus(401);
    //sending this response to server if we do not receive a any cookie or a jwt method
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt
    //checking if username exists
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) return res.sendStatus(403);//we send forbidden

    //evaluate jwt
   jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
        //adding user roles to access token when refreshed
    const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            { 
                "UserInfo" :{
                    "username": decoded.username,
                    "roles": roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "35s"}
        )
        res.json({accessToken})
    }
   )
}   
module.exports = { handleRefreshToken }
