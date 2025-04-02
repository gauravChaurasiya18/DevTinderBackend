const mongoose = require('mongoose')

const connectDB = async()=>{
 await mongoose.connect("mongodb+srv://gaurav:4tO242wTW1OFczkU@first.aq7u2.mongodb.net/")
}

module.exports = connectDB ;

