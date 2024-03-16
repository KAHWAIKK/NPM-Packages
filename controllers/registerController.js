

const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}


const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user , password } = req.body;
    if (!user || !password) return res.status(400).json({'message': `Username and password are required.`})//sending this response to server if we do not receive a response
    //check for duplicate usernames in the database
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409)// send a response of error code 409,
    /* if there is no duplicate */
    try {
        //encrypt the password using bycrypt
        const hashedPassword = await bcrypt.hash(password, 10);//no 10 is salting the password ,it add another layer of security even if the database was hacked
        //store the new user
        const newUser = { "username": user , "password": hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);

        //writing to uor json file
        await fsPromises.writeFile(
            path.join(__dirname, '..' , 'model', 'users.json'),
            JSON.stringify(usersDB.users)

        )
        console.log(usersDB)
        //console.log(usersDB.users)
        res.status(201).json({'success' : `New user ${user} has been created successfully`})

    } catch (err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = { handleNewUser}