

const User = require('../model/User')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user , password } = req.body;
    if (!user || !password) return res.status(400).json({'message': `Username and password are required.`})//sending this response to server if we do not receive a response
    //check for duplicate usernames in the database
    const duplicate = await User.findOne({
        username : user
    }).exec();
    if (duplicate) return res.sendStatus(409)// send a response of error code 409,
    /* if there is no duplicate */
    try {
        //encrypt the password using bycrypt
        const hashedPassword = await bcrypt.hash(password, 10);//no 10 is salting the password ,it add another layer of security even if the database was hacked


        //Create and store the new user
        const result = await User.create({ 
            
             "username": user ,
             /* "roles": { "User" : 2001}, */
             "password": hashedPassword 
            });

            console.log(result);
        
        res.status(201).json({'success' : `New user ${user} has been created successfully`})

    } catch (err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = { handleNewUser}