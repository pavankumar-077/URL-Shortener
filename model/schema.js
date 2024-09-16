const mongoose=require('mongoose')

const urlSchema=new mongoose.Schema({
shortURL:{
    type:String,
    required:true,
    unique:true
},
URL:{
    type:String,
    required:true
},
clicks:{
    type:Number,
    default:0
}
})
const URL=mongoose.model('URL',urlSchema)
module.exports=URL