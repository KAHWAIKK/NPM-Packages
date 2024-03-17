

const mongoose = require('mongoose')
const Schema = mongoose.Schema


//defining schema

const employeeSchema = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    }
})


//note that mongoose automatically looks for the plural,lowercased version of your model name in the database, i.e for a model name of Employee, mongoose will look for employees model in the database
module.exports = mongoose.model('Employee', employeeSchema)