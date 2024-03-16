

const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt');


//pull the jsonwebtoken package

const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises //as we have not intergrated any database and we are still working with our dev file
const path = require('path')


const handleLogin = async (req, res) => {
    const { user , password } = req.body;
    if (!user || !password) return res.status(400).json({'message': `Username and password are required.`})
    //sending this response to server if we do not receive a response

    //checking if username exists
    const foundUser = usersDB.users.find(person => person.username === user)
    if (!foundUser) return res.sendStatus(401);//we send not authorized to login 

    //evaluate password
    const match = await bcrypt.compare(password, foundUser.password)
    if(match) {
        //defining roles
        const roles = Object.values(foundUser.roles)
        //create JWT token
        const accessToken = jwt.sign(
        {
            //you would not like to parse the password that would compromise your security, we will parse in the this object
            "UserInfo" : {
                "username": foundUser.username,
                "roles" : roles//we have changed the payload for this JWT token to include the roles
            }   
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s'}
        )

        const refreshToken = jwt.sign({
            //you would not like to parse the password that would compromise your security, we will parse in the this object
            "username": foundUser.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
        );
        //saving refresh token with current user

        //save our refresh token in the db that will allow us to create a log out  route that will then allow us to invalidate the refresh token when the user logs out
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username) //this will create a new array of users that are not users that has not logged in 
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser ]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model','users.json'),
            JSON.stringify(usersDB.users)
        )

       
        //send the refresh token as a cookie and  set it httpOnly so that it is not available in javascript hence much more secure.
        res.cookie('jwt' ,refreshToken, {
            httpOnly: true,
            sameSite : 'None',
            secure : true,
            maxAge : 24 * 60 * 60 * 1000/* this is equal to oneday */
        })

         //we  will still need to send both the refresh token and the access token to the user. therefore the front end developer will need to store the access token in memory for security 
        res.json({ accessToken})//


        res.json({"success": `'${user} is logged in successfully'`})
    }else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin}