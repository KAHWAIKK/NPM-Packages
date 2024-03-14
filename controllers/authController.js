

const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt');


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
        //craeate JWT token
        res.json({"success": `'${user} is logged in successfully'`})
    }else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin}