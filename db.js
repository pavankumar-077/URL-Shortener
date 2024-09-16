const mongoose = require('mongoose');

const URI=process.env.URI

const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDb