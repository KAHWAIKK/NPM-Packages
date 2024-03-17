const mongoose = require('mongoose')


const connectDB = async ()  => {
    try {
         await mongoose.connect(process.env.DATABASE_URI, /* {
            //we pass in this object that would prevent warnings we would get from mongodb
            useUnifiedTopology: true,
            useNewUrlParser: true
         } */)
    }catch(err) {
        console.error(err)
    }
}


module.exports = connectDB;